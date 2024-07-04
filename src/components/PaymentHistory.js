import React from 'react'
import SideBar from './common/SideBar';
import LoanAccount from './LoanAccount';
import '../styles/dashboard.css';

const PaymentHistory = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loanAccounts = Object.entries(currentUser.loanAccount);
    console.log(loanAccounts);
    return (
        <div className="dashboard">
            <SideBar />
            <div className="main-content">
                {loanAccounts?.map(account => {
                    console.log("each account", account);
                    return (
                        <LoanAccount key={account[0]} account={account[1]} showPaymentHistory={true} />
                    );
                })}
            </div>
        </div>
    );
}

export default PaymentHistory