import React, { useState } from 'react';
import AmortizationSchedule from './AmortizationSchedule';
import '../styles/loanAccount.css';
import ModalComponent from './common/ModalComponent';
import PaymentHistoryTable from './PaymentHistoryTable';

const LoanAccount = ({ account, showPaymentHistory }) => {
    const [showSchedule, setShowSchedule] = useState(false);
    const [showPaymentHistoryModal, setShowPaymentHistoryModal] = useState(false);

    const handleShowSchedule = () => {
        setShowSchedule(!showSchedule);
    };

    const handleShowPaymentHistory = () => {
        setShowPaymentHistoryModal(!showPaymentHistoryModal);
    }

    return (
        <div className="loan-account">
            <h2>{account.name}</h2>
            <p>Availed On: {account.availedOn}</p>
            <p>Amount: ${account.amount}</p>
            <p>Balance: ${account.balance}</p>
            {showPaymentHistory ? (
                <button onClick={handleShowPaymentHistory}>
                    {showPaymentHistoryModal ? 'Hide Payment History' : 'Show Payment History'}
                </button>) : (
                <button onClick={handleShowSchedule}>
                    {showSchedule ? 'Hide Amortization Schedule' : 'Show Amortization Schedule'}
                </button>)}

            {showSchedule && (
                <ModalComponent onClose={handleShowSchedule}>
                    <AmortizationSchedule loan={account} />
                </ModalComponent>)}
            
            {
                showPaymentHistoryModal && (
                    <ModalComponent onClose={handleShowPaymentHistory}>
                        <PaymentHistoryTable account={account} />
                    </ModalComponent>
                )
            }
        </div>
    );
};

export default LoanAccount;
