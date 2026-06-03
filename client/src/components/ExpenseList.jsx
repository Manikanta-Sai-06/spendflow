import ExpenseItem from './ExpenseItem';

function ExpenseList({ expenses, onEdit, onDelete, filterCategory, setFilterCategory, filterMonth, setFilterMonth }) {
  
  return (
    <div className="list-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Recent Transactions</h3>
      </div>
      
      <div className="filters">
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Health">Health</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
        
        <input 
          type="month" 
          value={filterMonth} 
          onChange={(e) => setFilterMonth(e.target.value)} 
        />
        
        {(filterCategory || filterMonth) && (
          <button 
            className="btn-danger-outline" 
            onClick={() => { setFilterCategory(''); setFilterMonth(''); }}
            style={{ padding: '8px 12px', height: 'fit-content' }}
          >
            Clear
          </button>
        )}
      </div>

      <div className="expenses-container">
        {expenses.length === 0 ? (
          <div className="empty-state">
            No expenses found. Start adding some!
          </div>
        ) : (
          expenses.map(expense => (
            <ExpenseItem 
              key={expense._id} 
              expense={expense} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ExpenseList;
