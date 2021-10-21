import React, {useState} from 'react';
import TodoListMain from './todoListMain';
import TodoListAdd from './todoListAdd';
import "./todoList.css"

function TodoList()
{
    //to be used throughout as the way to change the todoList
    const [items, setItems] = useState([]);

    //to be used to refresh page when needed
    const [refresh, setRefresh] = useState(false);

    return(
        <div className = "main">
            <div className = "header">
                Todo List
            </div>
            <TodoListAdd items = {items} setItems = {setItems} refresh = {refresh} setRefresh = {setRefresh}/>
            <TodoListMain items = {items} setItems = {setItems} refresh = {refresh} setRefresh = {setRefresh}/>


        </div>
    );
}

export default TodoList;