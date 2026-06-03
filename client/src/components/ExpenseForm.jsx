import { useState, useEffect } from 'react';

function ExpenseForm({ onExpenseAdded, editingExpense, onExpenseUpdated, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(new Date(editingExpense.date).toISOString().split('T')[0]);
      setNote(editingExpense.note || '');
    }
  }, [editingExpense]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const expenseData = {
      title,
      amount: Number(amount),
      category,
      date,
      note
    };

    try {
      if (editingExpense) {
        const response = await fetch(`/api/expenses/${editingExpense._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(expenseData),
        });

        if (response.ok) {
          const updatedExpense = await response.json();
          onExpenseUpdated(updatedExpense);
          resetForm();
        } else {
          const data = await response.json();
          setError(data.message || 'Failed to update expense');
        }
      } else {
        const response = await fetch('/api/expenses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(expenseData),
        });

        if (response.ok) {
          const newExpense = await response.json();
          onExpenseAdded(newExpense);
          resetForm();
        } else {
          const data = await response.json();
          setError(data.message || 'Failed to add expense');
        }
      }
    } catch (err) {
      setError('Server error');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setCategory('Food');
    setDate(new Date().toISOString().split('T')[0]);
    setNote('');
    if (editingExpense) {
      onCancelEdit();
    }
  };

  return (
    <div className="form-card">
      <h3>{editingExpense ? 'Edit Expense' : 'Add New Expense'}</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="e.g. Groceries"
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Amount (₹)</label>
          <input 
            type="number" 
            step="0.01"
            min="0"
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="0.00"
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Health">Health</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Date</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Note (Optional)</label>
          <input 
            type="text" 
            value={note} 
            onChange={(e) => setNote(e.target.value)} 
            placeholder="Additional details..."
          />
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn-primary" style={{ flex: 1 }} disabled={isLoading}>
            {isLoading ? 'Saving...' : (editingExpense ? 'Update Expense' : 'Add Expense')}
          </button>
          
          {editingExpense && (
            <button type="button" className="btn-danger-outline" onClick={resetForm} disabled={isLoading}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
