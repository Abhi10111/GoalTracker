import React from "react";
import { motion } from "framer-motion";
import { MoreVertical } from "lucide-react";
import { formatMinutesToHMString } from "../../utils/UIUtils";
import "../../styles/ListCard.css";

export default function ListCard({ list }) {
  const tasks = list.tasks || []; // assume tasks array exists

  return (
    <motion.div className="listcard">
      {/* HEADER */}
      <div className="listcard-header">
        <div className="listcard-title">
          <div
            className="list-badge"
            style={{ background: list.color || "#4ade80" }}
          >
            {list.name.charAt(0).toUpperCase()}
          </div>

          <span className="list-name">{list.name}</span>
        </div>

        <MoreVertical size={18} className="menu-icon" />
      </div>

      {/* TASK PREVIEW */}
      <div className="listcard-body">
        {tasks.slice(0, 3).map((task, index) => (
          <div key={task.id} className="task-preview">
            <span className="task-index">{index + 1}</span>

            <span className="task-name">
              {task.title}
            </span>

            <span className="task-time">
              {formatMinutesToHMString(task.estimatedTime) || "00:00"}
            </span>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="listcard-footer">
        {tasks.length} pending tasks
      </div>
    </motion.div>
  );
}