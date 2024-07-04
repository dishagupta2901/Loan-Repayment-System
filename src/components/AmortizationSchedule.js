import React, {useState} from 'react';
import '../styles/amortizationSchedule.css';

const AmortizationSchedule = ({ loan }) => {
    const calculateAmortizationSchedule = (amount, rate, term) => {
        const monthlyRate = rate / 12 / 100;
        const numberOfPayments = term * 12;
        const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));

        let balance = amount;
        const schedule = [];

        for (let i = 1; i <= numberOfPayments; i++) {
            const interestPayment = balance * monthlyRate;
            const principalPayment = monthlyPayment - interestPayment;
            balance -= principalPayment;

            schedule.push({
                month: i,
                payment: monthlyPayment,
                principal: principalPayment,
                interest: interestPayment,
                balance: balance < 0 ? 0 : balance
            });

            if (balance <= 0) break;
        }

        return schedule;
    };

    const schedule = calculateAmortizationSchedule(loan.amount, 5, 5); // Example with 5% interest rate over 5 years

        // Pagination logic
        const [currentPage, setCurrentPage] = useState(1);
        const recordsPerPage = 10;
        const totalPages = Math.ceil(schedule.length / recordsPerPage);
    
        const handleNextPage = () => {
            if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1);
            }
        };
    
        const handlePreviousPage = () => {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        };
    
        const currentRecords = schedule.slice(
            (currentPage - 1) * recordsPerPage,
            currentPage * recordsPerPage
        );
    
    

    return (
        <div className="amortization-schedule">
            <h3>Amortization Schedule</h3>
            <table>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Payment</th>
                        <th>Principal</th>
                        <th>Interest</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((payment, index) => (
                        <tr key={index}>
                            <td>{payment.month}</td>
                            <td>${payment.payment.toFixed(2)}</td>
                            <td>${payment.principal.toFixed(2)}</td>
                            <td>${payment.interest.toFixed(2)}</td>
                            <td>${payment.balance.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default AmortizationSchedule;
