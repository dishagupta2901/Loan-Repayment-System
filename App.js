import React from 'react';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import PrivateRoute from './utils/PrivateRoute';
import './styles/theme.css'; // Import your CSS file for styling
import PaymentHistory from './components/PaymentHistory';
import PaymentForm from './components/PaymentForm';
import Profile from './components/Profile';

const Layout = ({ children }) => {
    return (
        <div className="app">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

const AppRoutes = () => (
    <Routes>
        <Route
            path="/"
            element={
                <Layout>
                    <LoginPage />
                </Layout>
            }
        />
        <Route
            path="/dashboard"
            element={
                <Layout>
                    <PrivateRoute>
                        <DashboardPage />
                    </PrivateRoute>
                </Layout>
            }
        />
        <Route
            path='/payment-history'
            element={
                <Layout>
                    <PrivateRoute>
                        <PaymentHistory />
                    </PrivateRoute>
                </Layout>
            }
        />
        <Route
            path='/payment-form'
            element={
                <Layout>
                    <PrivateRoute>
                        <PaymentForm />
                    </PrivateRoute>
                </Layout>
            }
        />
        <Route
            path='/profile'
            element={
                <Layout>
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                </Layout>
            }
        />
    </Routes>
);

const App = () => {
    const router = createBrowserRouter([
        {
            path: '*',
            element: <AppRoutes />,
        }
    ]);
    
    return (
        <RouterProvider router={router} />
    );
};

export default App;
