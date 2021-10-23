import React, {useState, useEffect, useRef} from 'react';
import TodoListMain from './todoListMain';
import TodoListAdd from './todoListAdd';
import { getListCall } from './todoREST';
import "./todoList.css"
import logo from "./logo2.png"

function TodoList()
{
    //to be used throughout as the way to change the todoList
    const [items, setItems] = useState([]);
    const itemsRef = useRef(items)

    //to be used to refresh page when needed
    const [refresh, setRefresh] = useState(false);

    useEffect(() =>{
        const getList = async() =>
        {
            let result = await getListCall()
            itemsRef.current = result.data
            setItems(itemsRef.current)
        };
        getList()
        console.log("called")

    }, [])

    useEffect(() =>{
        const getList = async() =>
        {
            let result = await getListCall()
            itemsRef.current = result.data
            setItems(itemsRef.current)
        };
        getList()
        console.log("looop")

    }, [refresh])

    return(
        <div className = "main">
            <img className = "logo" src = {logo} />
            <div className = "header">
                What's For Today?
            </div>
            <TodoListAdd items = {items} setItems = {setItems} refresh = {refresh} setRefresh = {setRefresh}/>
            <TodoListMain items = {items} setItems = {setItems} refresh = {refresh} setRefresh = {setRefresh}/>


        </div>
    );
}

export default TodoList;