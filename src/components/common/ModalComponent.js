import React from 'react';
import '../../styles/modal.css';

const ModalComponent = ({ children, onClose }) => {
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default ModalComponent;
