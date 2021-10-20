import React, {useState} from 'react'
import TodoListItem from './todoListItem';

function TodoListMain()
{
    const [items, setItems] = useState([{desc: "hi", date: "hello", time: "hola"}, {desc: "bye", date:"adios", time: "hasta"}]);

    return(
        <div>
            <u1 className = "todoListMain">
                {
                    items.map((item) =>
                        <li>
                            <TodoListItem desc = {item.desc} date = {item.date} time = {item.time}/>
                        </li>
                    )

                }
            </u1>
        </div>
    );
}

export default TodoListMain;