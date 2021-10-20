
function TodoListItem(props)
{
    const{
        desc,
        date,
        time
    } = props;

    return(
        <div className = "item">
            <span>{desc}</span>
            <span>{date}</span>
            <span>{time}</span>
            <span><button id = "button">Edit</button></span>
            <span><button id = "button">Remove</button></span>
        </div>
        
    )
}
export default TodoListItem;