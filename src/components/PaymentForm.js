import React, { useState } from 'react';
import axios from 'axios';
import '../styles/dashboard.css';
import '../styles/paymentForm.css';
import SideBar from './common/SideBar';

const PaymentForm = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loanAccounts = Object.entries(currentUser.loanAccount);
    const [selectedLoan, setSelectedLoan] = useState(loanAccounts[0][0]);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleLoanChange = (event) => {
        setSelectedLoan(event.target.value);
    };

    const handleAmountChange = (event) => {
        setPaymentAmount(event.target.value);
    };

    const handlePayment = async () => {
        const loan = loanAccounts.find(([key]) => key === selectedLoan)[1];
        const monthlyRate = 5 / 12 / 100; // Assume a fixed interest rate of 5% per year
        const interestPayment = loan.balance * monthlyRate;
        const principalPayment = paymentAmount - interestPayment;

        if (paymentAmount <= 0 || paymentAmount > currentUser.accountBalance) {
            setMessage('Invalid payment amount');
            return;
        }

        const updatedLoan = {
            ...loan,
            balance: loan.balance - principalPayment > 0 ? loan.balance - principalPayment : 0,
            history: [
                ...loan.history,
                {
                    id: loan.history.length + 1,
                    amount: paymentAmount,
                    date: new Date().toISOString().split('T')[0],
                },
            ],
        };

        const updatedLoanAccounts = {
            ...currentUser.loanAccount,
            [selectedLoan]: updatedLoan,
        };

        const updatedUserAccount = {
            ...currentUser,
            accountBalance: currentUser.accountBalance - paymentAmount,
            loanAccount: updatedLoanAccounts,
        };

        try {
            const response = await axios.put(`http://localhost:5000/users/${currentUser.id}`, updatedUserAccount);

            if (response.status === 200) {
                localStorage.setItem('currentUser', JSON.stringify(updatedUserAccount));
                setPaymentAmount('');
                setMessage('Payment successful');
            } else {
                setMessage('Failed to update the loan account. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="dashboard">
            <SideBar />
            <div className="main-content">
                {/* <p>Here you can create a repayment of your Loans.</p> */}
                <div className="payment-form">
                    <h3>Make a Payment</h3>
                    {message && <p className="message">{message}</p>}
                    <label>
                        Select Loan Account:
                        <select value={selectedLoan} onChange={handleLoanChange}>
                            {loanAccounts.map(([key, account]) => (
                                <option key={key} value={key}>
                                    {account.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Amount:
                        <input
                            type="number"
                            value={paymentAmount}
                            onChange={handleAmountChange}
                        />
                    </label>
                    <button onClick={handlePayment}>Submit Payment</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;
