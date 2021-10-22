import { useState } from "react";
import {updateItemCall, removeItemCall} from './todoREST'

function TodoListItem(props)
{

    //init variables
    const{
        desc,
        date,
        time,
        id,
        index,
        items,
        setItems,
        refresh,
        setRefresh
    } = props;

    //used for seeing whether or not user can edit the description
    //user may only edit if they have pressed the edit button
    //afterwards this is also used to confirm that they have made valid changes
    const [canEdit, setEdit] = useState(false);
    const [text, setText] = useState(desc)

    const handleEdit = () =>
    {
        //check if empty string or null
        if(text == null)
        {
            alert("You have left the description blank!")
        }
        else if (text.trim() === "" && canEdit)
        {
            alert("You have provided an invalid description!");
        }
        else if(text.length >= 1 && canEdit)
        {
            //remove the item being edited from list
            let newItems = items.filter( item => item.id !== id);

            //assumption is that when a user edits an item within the todo list
            //the date and time is also updated accordingly
            var dates = new Date();
            var date = dates.toDateString();
            var time = dates.toLocaleTimeString();

            //add to end of list to order by date and time
            let overwrittenItem = {Description: text.trim(), Date: date, Time: time, ID: id}
            newItems.push(overwrittenItem)

            updateItemCall(text.trim(), date, time, id).then((res) => {
                console.log("Success")
                //update
                setRefresh(!refresh)
                //user can no longer edit description unless they press edit button again
                setEdit(false);
            })

        }
        else if(!canEdit)
        {
            //to initiate editing the description, toggle on
            setEdit(true);
        }

    }

    //function in handling removing an item from todolist
    const handleRemove = () =>
    {
        //let newItems = items.filter( item => item.id !== id)
        //setItems(newItems)

        removeItemCall(id).then((res) =>
        {
            console.log("Removed Successfully")
            setRefresh(!refresh)
        })
    }

    return(
        <div className = "item">
            <span><input className = "descField" type = "text" maxLength = "20" defaultValue = {text} onChange = {(ev) => setText(ev.target.value)} disabled = {!canEdit} /></span>
            <span>{date}</span>
            <span>{time}</span>
            <span><button className = "button" id = {index} onClick = {() => handleEdit()}>{canEdit? "Confirm" : "Edit"}</button></span>
            <span><button className = "button" id = {index} onClick = {() => handleRemove()}>Remove</button></span>
        </div>
        
    )
}
export default TodoListItem;