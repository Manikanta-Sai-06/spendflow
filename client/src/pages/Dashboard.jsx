import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Charts from '../components/Charts';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filtering states
  const [filterCategory, setFilterCategory] = useState('');
  // Default month filter to current month
  const currentMonth = new Date().toISOString().slice(0, 7);
  const [filterMonth, setFilterMonth] = useState(currentMonth);

  // Edit state
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, [filterCategory, filterMonth]);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      let url = '/api/expenses?';
      if (filterCategory) url += `category=${filterCategory}&`;
      if (filterMonth) url += `month=${filterMonth}`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
      } else {
        setError('Failed to fetch expenses');
      }
    } catch (err) {
      setError('Server error');
    } finally {
      setLoading(false);
    }
  };

  const handleExpenseAdded = (newExpense) => {
    // Re-fetch to apply filters/sorting properly, or just add to top
    // For simplicity, we just re-fetch
    fetchExpenses();
  };

  const handleExpenseUpdated = (updatedExpense) => {
    fetchExpenses();
    setEditingExpense(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;
    
    try {
      const response = await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setExpenses(expenses.filter(exp => exp._id !== id));
      }
    } catch (err) {
      alert('Failed to delete expense');
    }
  };

  // Calculate totals
  const totalBalance = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  if (loading && expenses.length === 0) {
    return <div className="loading-screen">Loading dashboard...</div>;
  }

  return (
    <div>
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="balance-card">
        <h3>Total Spent {filterMonth ? `in ${new Date(filterMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}` : ''}</h3>
        <div className="amount">₹{totalBalance.toFixed(2)}</div>
      </div>

      <Charts expenses={expenses} />

      <div className="dashboard-content">
        <ExpenseForm 
          onExpenseAdded={handleExpenseAdded} 
          editingExpense={editingExpense}
          onExpenseUpdated={handleExpenseUpdated}
          onCancelEdit={() => setEditingExpense(null)}
        />
        
        <ExpenseList 
          expenses={expenses} 
          onEdit={setEditingExpense}
          onDelete={handleDelete}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterMonth={filterMonth}
          setFilterMonth={setFilterMonth}
        />
      </div>
    </div>
  );
}

export default Dashboard;
