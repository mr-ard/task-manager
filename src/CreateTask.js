import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CreateTask = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [eta, setEta] = useState("");
  const [status, setStatus] = useState("Pending");
  const [id, setId] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: id,
      title: title,
      eta: eta,
      status: status,
      auditTrail: [{ status: status, eta: eta, timeStamp: Date.now() }],
    };
    addTask(newTask);
    setTitle("");
    setEta("");
    setStatus("Pending");
    setId(id + 1);
  };

  return (
    <div>
      <h2>Create Task</h2>
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
