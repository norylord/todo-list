import React from 'react';
import './Input.sass'

const Input = ({placeholder, onChange, onKeyPress, value }) => {
    return (
        <input onKeyPress={onKeyPress} value={value} placeholder={placeholder} onChange={onChange} className='Input'/>
    );
};

export default Input;
