import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { AddTaskBox } from "./Taskutils.jsx";
import "./taskcard.css";
import { SubTasks, SubtaskHeader } from "./SubtaskComponents.jsx";
import { IsModifiedToday, TasksContext } from "./Taskutils.jsx";


export default function TaskCard({ task }) {
    const [subtasksOpen, setSubTaskOpen] = useState(false);
    const [isAddingSubTask, setAddingSubTasks] = useState(false);

    return (
        <motion.div
            className="taskcard"
            whileHover={{ scale: 1.03 }}
        >
            <div className="task-info">
                <span className={task.completed ? "line-through opacity-70" : "opacity-100"} >
                    {task.title}
                </span>
            </div>
            <div className="divider" />
            {<div className="subtasks">
                <SubtaskHeader
                    taskId={task.id}
                    subtasksOpen={subtasksOpen}
                    onClick={() => setSubTaskOpen(!subtasksOpen)}
                    onClickAddSubtask={() => setAddingSubTasks(!isAddingSubTask)} />
                {subtasksOpen &&
                    <SubTasks taskId={task.id} />}
            </div >}
            {isAddingSubTask && <AddTaskBox taskId={task.id} onClose={() => setAddingSubTasks(false)} />}
        </motion.div >
    )
}