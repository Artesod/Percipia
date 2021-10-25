import React, {useState} from 'react';
import {addItemCall} from './todoREST'


function TodoListAdd(props)
{
    //set variables to be used
    const{
        items,
        refresh,
        setRefresh
    } = props;

    //used for description textfield
    const [text, setText] = useState("")

    const generateID = () =>
    {
        var biggestID = -1

        if (items !== null)
        {
            for (var i = 0; i < items.length; i++)
            {
                if (items[i].ID > biggestID)
                {
                    biggestID = items[i].ID
                }

            }

            return biggestID + 1
        }
        else
        {
            return 0;
        }

    }

    //function to handle adding a new item to the todo list
    const handleAdd = () =>
    {
        //if there is an empty textfield, return an error
        if(text.trim() === "")
        {
            alert("You have entered an invalid description!")
        }
        else
        {
            //get date and time
            var dates = new Date();
            var date = dates.toDateString();
            var Time = dates.toLocaleTimeString();

            //get id
            var ID = generateID();
            var Description = text.trim();

            addItemCall(Description, date, Time, ID ).then((res) => {
                setText("")
                setRefresh(!refresh)
            })
        }
    }

    return(
    <div className = "addContainer">
        <span><input className = "addTextField" type = "text" maxLength = "20" placeholder = "Description" value = {text} onChange = {(ev) => setText(ev.target.value)}/></span>
        <span><button className = "button" onClick = {() => handleAdd()} >Add</button></span>
    </div>
    
    );
}

export default TodoListAdd;