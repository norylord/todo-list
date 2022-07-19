import React, {useEffect, useState} from 'react';
import './ToDoList.sass'
import ToDoItem from "../ToDoItem/ToDoItem";
import Input from "../../UI/Input/Input";

const ToDoList = () => {

    const date = new Date()

    const [toDoList, setToDoList] = useState(() => {
        const savedToDoList = JSON.parse(localStorage.getItem('toDoList'))
        if (savedToDoList) {
            return savedToDoList
        } else {
            return []
        }
    })
    const [title, setTitle] = useState('')

    const [order, setOrder] = useState(() => {
        const savedOrder = JSON.parse(localStorage.getItem('order'))
        if (savedOrder) {
            return savedOrder
        } else {
            return 0
        }
    })

    const [currentItem, setCurrentItem] = useState(null)

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('toDoList'))
        if (items) {
            setToDoList(items)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('toDoList', JSON.stringify(toDoList))
    }, [toDoList])

    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(order))
    }, [toDoList])


    const enterPress = (event) => {
        if (event.key === 'Enter') {
            createToDoItem()
        }
    }

    const createToDoItem = () => {
        if (title) {
            const newItem = {
                id: date.getTime(),
                order: order,
                date: `${date.getHours()}:${date.getMinutes()}`,
                title: title,
                completed: false
            }
            setToDoList(toDoList => [...toDoList, newItem])
            setTitle('')
            setOrder(order + 1)
        }
    }
    const toggleToDoItem = (id) => {
        setToDoList(
            toDoList.map(item => (
                item.id === id ? {...item, completed: !item.completed} : item
            ))
        )
    }
    const deleteToDoItem = (id) => {
        setToDoList([...toDoList.filter((item) => item.id !== id)])
    }


    const dragStartHandler = (e, item) => {
        console.log(item)
        setCurrentItem(item)
    }

    const dragEndHandler = (e) => {
    }

    const dragOverHandler = (e) => {
        e.preventDefault()
    }

    const dropHandler = (e, item) => {
        e.preventDefault()
        setToDoList(toDoList.map(i => {
            if (i.id === item.id) {
                return {...i, order: currentItem.order}
            }
            if (i.id === currentItem.id) {
                return {...i, order: item.order}
            }
            return i
        }))
    }

    const sortItems = (a, b) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    return (
        <div className='toDoList'>
            <div className='toDoListInfo'>
                <h1>ToDo List</h1>
                <h3>{date.getDate()}.{date.getUTCMonth() + 1}.{date.getFullYear()}</h3>
                <Input onKeyPress={enterPress} placeholder='Просто впишите задачу' value={title}
                       onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="toDoContainer">
                {
                    toDoList.sort(sortItems).map((item) => (
                        <ToDoItem key={item.id} completed={item.completed} toggle={toggleToDoItem}
                                  remove={deleteToDoItem} id={item.id} date={item.date} title={item.title}
                                  onDragStart={(e) => dragStartHandler(e, item)}
                                  onDragLeave={e => dragEndHandler(e)}
                                  onDragEnd={e => dragEndHandler(e)}
                                  onDragOver={e => dragOverHandler(e)}
                                  onDrop={e => dropHandler(e, item)}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default ToDoList;
