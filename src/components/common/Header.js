import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/theme.css';
import '../../styles/header.css';
import logo from '../../utils/logo.png';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    return (
        <div className="header">
            <img src={logo} alt="logo" width="200" height="100" />
            <nav>
                <ul>
                    <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    {/* Add more links as needed */}
                </ul>
            </nav>
        </div>
    );
};

export default Header;
