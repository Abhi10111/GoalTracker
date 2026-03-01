import React, { useContext } from "react";
import { motion, scale } from "framer-motion";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatMinutesToHMString } from "../../utils/UIUtils";
import "../../styles/ListCard.css";
import { TasksContext } from "../../context/TaskContext"; 

const listCardVariants = {
  hovered: {
    border: "1px solid #2ecc71",
    boxShadow: `
      0 0 0 1px #2ecc71 inset,
      0 0 12px rgba(46, 204, 113, 0.35)
    ` }
}

export default function ListCard({ list }) {
  const { getTaskbyListId } = useContext(TasksContext)
  const tasks = getTaskbyListId(list.id);
  const navigate = useNavigate()
  return (
    <motion.div className="listcard"
      variants={listCardVariants}
      whileHover="hovered"
      transition={{ duration: 0.01 }}
      onClick={() => navigate(`/list/${list.id}`)}
    >
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
        {tasks?.slice(0, 4).map((task, index) => (
          <div key={task.id} className="task-preview">
            <span>{index + 1}</span>
            <span style={{ flex: 1 }}>{task.title}</span>
            <span>{formatMinutesToHMString(task.estimatedTime)}</span>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="listcard-footer">
        {tasks?.length} pending tasks
      </div>
    </motion.div>
  );
}