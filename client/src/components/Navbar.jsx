import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">ExpenseTracker</Link>
      </div>
      <div className="navbar-user">
        <span>Hi, {user.username}</span>
        <button className="btn-danger-outline" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
