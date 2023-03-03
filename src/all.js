/*

TaskManager.js:
import React, { useState } from "react";
import TaskList from "./TaskList";
import CreateTask from "./CreateTask";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (id, task) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === id) {
          const updatedTask = { ...t, ...task };
          if (task.status !== t.status || task.eta !== t.eta) {
            updatedTask.auditTrail = [
              ...(t.auditTrail || []),
              {
                timeStamp: Date.now(),
                status: task.status !== t.status ? task.status : null,
                eta: task.eta !== t.eta ? task.eta : null,
              },
            ];
          }
          return updatedTask;
        }
        return t;
      })
    );
  };

  const getTaskById = (id) => {
    return tasks.find((t) => t.id === id);
  };

  return (
    <div>
      <CreateTask addTask={addTask} />
      <TaskList tasks={tasks} updateTask={updateTask} getTaskById={getTaskById} />
    </div>
  );
};

export default TaskManager;

TaskList.js:
import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, updateTask, getTaskById }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          updateTask={updateTask}
          getTaskById={getTaskById}
        />
      ))}
    </div>
  );
};

export default TaskList;

CreateTask.js:

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

TaskCard.js

import React, { useState } from "react";

const TaskCard = ({ task, updateTask }) => {
  const [editing, setEditing] = useState(false);
  const [eta, setEta] = useState(task.eta);
  const [status, setStatus] = useState(task.status);
  const [auditTrail, setAuditTrail] = useState(null);

  const handleUpdate = () => {
    const updatedTask = { eta, status };
    if (task.status !== status) {
      updatedTask["statusTimestamp"] = Date.now();
    }
    if (task.eta !== eta) {
      updatedTask["etaTimestamp"] = Date.now();
    }
    updateTask(task.id, updatedTask);
    setEditing(false);
  };

  const handleAuditTrail = () => {
    if (task.auditTrail) {
      const trail = task.auditTrail
        .sort((a, b) => a.timeStamp - b.timeStamp)
        .map((item) => {
          if (item.status) {
            return `${item.status} - ${new Date(
              item.timeStamp
            ).toLocaleString()}`;
          }
          if (item.eta) {
            return `${item.eta} - ${new Date(
              item.timeStamp
            ).toLocaleString()}`;
          }
          return "";
        });
      setAuditTrail(trail.join(", "));
    } else {
      setAuditTrail("No audit trail available.");
    }
  };

  return (
    <div>
      <div>
        <p>ID: {task.id}</p>
        <p>Title: {task.title}</p>
        <p>ETA: {task.eta}</p>
        <p>Status: {task.status}</p>
      </div>
      {editing ? (
        <div>
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
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <button onClick={() => setEditing(true)}>Update Task</button>
          <button onClick={handleAuditTrail}>Audit Trail</button>
          {auditTrail && <div>{auditTrail}</div>}
        </div>
      )}
    </div>
  );
};

export default TaskCard;




*/