import React from 'react';
import './button.css';

const Button = ({ label }) => {
    const handleSubmit = (e) => { e.preventDefault() }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' name="name"/>
                <button data-testid="button" type='submit' className="button">{label}</button>
            </form>
        </div>
    )
}

export default Button
