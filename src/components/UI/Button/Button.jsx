import React from 'react';
import './Button.sass'

const Button = ({onClick, bgColor, children}) => {
    return (
        <button style={{backgroundColor: bgColor}} onClick={onClick} className='Button'>
            {children}
        </button>
    );
};

export default Button;
