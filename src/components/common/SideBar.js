import React from 'react'

const SideBar = () => {
    return (
        <div className="sidebar">
            <nav>
                <ul>
                    <li><a href="/payment-form">Payment Form</a></li>
                    <li><a href="/payment-history">Payment History</a></li>
                    <li><a href="/profile">Profile</a></li>
                </ul>
            </nav>
        </div>)
}

export default SideBar