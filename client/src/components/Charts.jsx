import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function Charts({ expenses }) {
  // Aggregate expenses by category
  const categoryData = expenses.reduce((acc, exp) => {
    const existing = acc.find(item => item.name === exp.category);
    if (existing) {
      existing.value += exp.amount;
    } else {
      acc.push({ name: exp.category, value: exp.amount });
    }
    return acc;
  }, []);

  // Sort by value descending
  categoryData.sort((a, b) => b.value - a.value);

  // Category Colors
  const COLORS = {
    'Food': '#ff9f43',
    'Transport': '#0abde3',
    'Shopping': '#ee5253',
    'Health': '#10ac84',
    'Entertainment': '#5f27cd',
    'Other': '#8395a7'
  };

  if (expenses.length === 0) {
    return null;
  }

  return (
    <div className="charts-section">
      <div className="chart-card">
        <h3>Spending by Category (Bar)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e1e8ed" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6c757d' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#6c757d' }} axisLine={false} tickLine={false} />
            <Tooltip 
              cursor={{ fill: 'rgba(0,0,0,0.05)' }} 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name] || COLORS.Other} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Category Breakdown (Pie)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name] || COLORS.Other} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Charts;
