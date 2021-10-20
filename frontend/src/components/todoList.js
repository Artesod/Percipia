import React from 'react';
import TodoListMain from './todoListMain';
import TodoListAdd from './todoListAdd';
import "./todoList.css"

function todoList()
{

    return(
        <div className = "main">
            <div className = "header">
                Todo List
            </div>
            <TodoListAdd />
            <TodoListMain />


        </div>
    );
}

export default todoList;