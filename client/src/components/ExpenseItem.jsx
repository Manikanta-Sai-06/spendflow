function ExpenseItem({ expense, onEdit, onDelete }) {
  const COLORS = {
    'Food': 'var(--cat-food)',
    'Transport': 'var(--cat-transport)',
    'Shopping': 'var(--cat-shopping)',
    'Health': 'var(--cat-health)',
    'Entertainment': 'var(--cat-entertainment)',
    'Other': 'var(--cat-other)'
  };

  const badgeColor = COLORS[expense.category] || COLORS.Other;
  
  const formattedDate = new Date(expense.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="expense-item">
      <div className="expense-info">
        <div className="expense-badge" style={{ backgroundColor: badgeColor }}>
          {expense.category}
        </div>
        <div className="expense-details">
          <h4>{expense.title}</h4>
          <p>{formattedDate} {expense.note && `• ${expense.note}`}</p>
        </div>
      </div>
      
      <div className="expense-amount-actions">
        <div className="expense-amount">
          ₹{expense.amount.toFixed(2)}
        </div>
        <div className="expense-actions" style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="btn-primary" 
            style={{ padding: '6px 12px', fontSize: '12px' }}
            onClick={() => onEdit(expense)}
          >
            Edit
          </button>
          <button 
            className="btn-danger" 
            style={{ padding: '6px 12px', fontSize: '12px' }}
            onClick={() => onDelete(expense._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseItem;
