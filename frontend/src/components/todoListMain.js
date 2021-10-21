import React from 'react'
import TodoListItem from './todoListItem';

function TodoListMain(props)
{
    //init variables
    const{
        items,
        setItems,
        refresh,
        setRefresh
    } = props;


    //this will map out a list of all the various items
    return(
        <div>
            {items ? 
            <ul className = "todoListMain">
                {
                    items.map((item, i) =>
                        <li key = {item.id}>
                            <TodoListItem desc = {item.desc} date = {item.date} id = {item.id}
                            time = {item.time} index = {i} items = {items} setItems = {setItems}
                            refresh = {refresh} setRefresh = {setRefresh}
                            />
                        </li>
                    )

                }
            </ul>
            : ""
            }
        </div>
    );
}

export default TodoListMain;