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

