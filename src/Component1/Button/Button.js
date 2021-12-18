import React from 'react';
import './button.css';

const Button = ({ label }) => {
    return (
        <div>
            <button data-testid="button" className="button">{label}</button>
        </div>
    )
}

export default Button
