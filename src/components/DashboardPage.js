import React from 'react';
import '../styles/dashboard.css';
import LoanAccount from './LoanAccount';
import SideBar from './common/SideBar';

const Dashboard = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loanAccounts = Object.entries(currentUser.loanAccount);
    console.log(loanAccounts);
    return (
        <div className="dashboard">
            <SideBar />
            <div className="main-content">
                <h1>Welcome, {currentUser.username}</h1>
                <p>Here you can manage your loans, view payment history, and update your profile.</p>
                {loanAccounts?.map(account => {
                    console.log("each account",account);
                    return (
                        <LoanAccount key={account[0]} account={account[1]} />
                    );
                })}
            </div>
        </div>
    );
};

export default Dashboard;
