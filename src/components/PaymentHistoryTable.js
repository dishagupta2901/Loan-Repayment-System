import React from 'react';
import '../styles/paymentTable.css';

const PaymentHistoryTable = ({account}) => {
    return (
        <div className="payment-history">
            <h3>Payment History</h3>
            <table>
                <thead>
                    <tr>
                        <th>Payment Id</th>
                        <th>Payment Date</th>
                        <th>Amount</th>
                        {/* <th>Interest</th>
                        <th>Balance</th> */}
                    </tr>
                </thead>
                <tbody>
                    {account.history.map(payment => (
                        <tr key={payment.id}>
                            <td>{payment.id}</td>
                            <td>{payment.date}</td>
                            <td>${payment.amount}</td>
                            {/* <td>${payment.balance}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>)
}

export default PaymentHistoryTable