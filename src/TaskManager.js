import React, { useState } from "react";
import TaskList from "./TaskList";
import CreateTask from "./CreateTask";
import "./TaskManager.css"; // <-- Import the CSS file

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
    <div className="task-manager-container">
      <h1 className="task-manager-header">Task Manager</h1>
      <CreateTask addTask={addTask} />
      <TaskList tasks={tasks} updateTask={updateTask} getTaskById={getTaskById} />
    </div>
  );
};

export default TaskManager;
