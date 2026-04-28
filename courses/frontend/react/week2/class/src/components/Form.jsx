import { useState } from "react";
import "./Form.css";

export default function Form() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    function handleSubmit(event) {
        event.preventDefault();
        alert("Form submitted");
    }
    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <input className="form-input" type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} />
            <input className="form-input" type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
            <textarea className="form-input" placeholder="Message" name="message" value={formData.message} onChange={handleChange} />
            <button className="form-button" type="submit">Submit</button>
        </form>
    );
}