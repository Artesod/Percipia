import React, {useState} from 'react';


function TodoListAdd(props)
{
    //set variables to be used
    const{
        items,
        setItems,
        refresh,
        setRefresh
    } = props;

    //used for description textfield
    const [text, setText] = useState("")

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
            var time = dates.toLocaleTimeString();

            //get id
            var id = items.length;
            var desc = text.trim();

            let newItems = items;
            newItems.push({desc, date, time, id})

            //reset textfield
            setText("")

            //add to list
            setItems(newItems)

            //refresh page
            setRefresh(!refresh)
        }
    }

    return(
    <div>
        <span><input type = "text" maxLength = "20" placeholder = "Description" value = {text} onChange = {(ev) => setText(ev.target.value)}/></span>
        <span><button className = "button" onClick = {() => handleAdd()} >Add</button></span>
    </div>
    
    );
}

export default TodoListAdd;