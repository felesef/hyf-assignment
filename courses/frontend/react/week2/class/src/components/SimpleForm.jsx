import { useState } from "react";

export default function SimpleForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [feedback, setFeedback] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFeedback("");

    if (!form.name.trim() || !form.email.trim()) {
      setFeedback("Name and email are required.");
      return;
    }
    if (!form.email.includes("@")) {
      setFeedback("Please enter a valid-looking email.");
      return;
    }

    alert(`Submitted: ${form.name} / ${form.email}`);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="simple-name">Name</label>
        <input
          id="simple-name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="simple-email">Email</label>
        <input
          id="simple-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="simple-message">Message</label>
        <textarea
          id="simple-message"
          name="message"
          value={form.message}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
      {feedback && <p role="alert">{feedback}</p>}
    </form>
  );
}
