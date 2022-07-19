import React from 'react';
import './ToDoItem.sass'
import Button from "../../UI/Button/Button";
import {FaTrashAlt, FaCheck} from 'react-icons/fa';
import {CgClose} from 'react-icons/cg';

const ToDoItem = ({
                      date, title, id, remove, toggle, completed,
                      onDragStart, onDragLeave, onDragEnd, onDragOver, onDrop
                  }) => {

    return (
        <div className='toDoItem' draggable={true}
             onDragStart={onDragStart}
             onDragLeave={onDragLeave}
             onDragEnd={onDragEnd}
             onDragOver={onDragOver}
             onDrop={onDrop}
        >
            <div className='toDoItemDate'>{date}</div>
            <div style={completed ? {textDecoration: 'line-through'} : null}
                 className='toDoItemTitle'>
                {title}
            </div>
            <div className='buttonContainer'>
                <Button onClick={() => toggle(id)} bgColor={completed ? '#b5179e' : 'green'}
                        children={completed ? <CgClose/> : <FaCheck/>}/>
                <Button onClick={() => remove(id)} bgColor='red' children=<FaTrashAlt/>/>
            </div>
        </div>
    );
};

export default ToDoItem;
