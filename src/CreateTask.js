import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const CreateTask = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [eta, setEta] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      id: uuid(),
      title,
      eta,
      status,
    };
    addTask(task);
    setTitle("");
    setEta("");
    setStatus("Pending");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          ETA:
          <input
            type="date"
            value={eta}
            onChange={(e) => setEta(e.target.value)}
          />
        </label>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="InProgress">InProgress</option>
            <option value="InReview">InReview</option>
            <option value="Complete">Complete</option>
</select>
</label>
<button type="submit">Create Task</button>
</form>
</div>
);
};

export default CreateTask;
