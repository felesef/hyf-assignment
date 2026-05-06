import { useState } from "react";
import "./ToDo.css";


export default function ToDo() {
    const [toDoList, setToDoList] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        assignee: "",
        duration: "",
        note: ""
    });
    function handleSubmit(event) {
        event.preventDefault();
        resetFormData();
        // send it into an array
        const newToDo = { 
            id: crypto.randomUUID(),
            name: formData.name,
            description: formData.description,
            assignee: formData.assignee,
            duration: formData.duration,
            note: formData.note
        };
        setToDoList([...toDoList, newToDo]);
        //alert("ToDo submitted");
    }
    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    function resetFormData() {
        setFormData({
            name: "",
            description: "",
            assignee: "",
            duration: "",
            note: ""
        });
    }
    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <input className="form-input" type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} />
            <input className="form-input" type="text" placeholder="Description" name="description" value={formData.description} onChange={handleChange} />
            <input className="form-input" type="text" placeholder="Assignee" name="assignee" value={formData.assignee} onChange={handleChange} />
            <input className="form-input" type="text" placeholder="Duration in minutes" name="duration" value={formData.duration} onChange={handleChange} />
            <textarea className="form-input" placeholder="Note" name="note" value={formData.note} onChange={handleChange} />
            <button className="form-button" type="submit">Submit</button>
            <ToDoList toDoList={toDoList} />
        </form>
    );
}

export function ToDoList({ toDoList }) {
    return toDoList.map((toDoItem) => (
        <div key={toDoItem.id}>
            <h3>{toDoItem.name}</h3>
            <p>{toDoItem.description}</p>
            <p>{toDoItem.assignee}</p>
            <p>{toDoItem.duration}</p>
            <p>{toDoItem.note}</p>
        </div>
    ));
}