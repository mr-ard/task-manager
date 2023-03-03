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
