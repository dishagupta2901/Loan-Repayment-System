import React from 'react';
import '../styles/profile.css';
import SideBar from './common/SideBar';

const Profile = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return (
        <div className="dashboard">
            <SideBar />
            <div className="main-content">
                <h2>Profile</h2>
                <div className="profile-details">
                    <p><strong>Name:</strong> {currentUser.username}</p>
                    {/* <p><strong>Email:</strong> {currentUser.email}</p> */}
                    <p><strong>Account Balance:</strong> ${currentUser.accountBalance}</p>
                    <h3>Loan Accounts</h3>
                    <ul>
                        {Object.entries(currentUser.loanAccount).map(([key, account]) => (
                            <li key={key}>
                                <strong>{account.name}:</strong>
                                <ul>
                                    <li>Availed On: {account.availedOn}</li>
                                    <li>Amount: ${account.amount}</li>
                                    <li>Balance: ${account.balance}</li>
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Profile;
