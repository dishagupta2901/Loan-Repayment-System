import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/AuthService';
import '../styles/theme.css';
import '../styles/loginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Login form submitted', username, password);
        try {
            const user = await authService.login(username, password);
            console.log('User logged in:', user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            navigate('/dashboard');
        } catch (error) {
            setError('Invalid username or password. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-form">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
