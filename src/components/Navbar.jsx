import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand" onClick={() => navigate('/leads')}>
                <span className="brand-icon">💼</span>
                <span className="brand-text">LeadManager</span>
            </div>
            <div className="navbar-actions">
                <span className="user-welcome">Welcome, <strong>{user?.username}</strong></span>
                <button onClick={handleLogout} className="btn-logout">
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
