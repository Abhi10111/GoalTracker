import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import "./taskcard.css";
import { SubTasks, SubtaskHeader } from "./SubtaskComponents.jsx";
import { AddTaskBox, TasksContext } from "../utils/Taskutils.jsx";
import { ActionButton, ActionPane } from "../utils/UIUtils.jsx";
import { Play, Pause, Trash2 } from "lucide-react";

export default function TaskCard({ task }) {
    const [subtasksOpen, setSubTaskOpen] = useState(false);
    const [isAddingSubTask, setAddingSubTasks] = useState(false);
    const { _, dispatch } = useContext(TasksContext);
    const taskTime = task.subtasks?.reduce((total, subtask) => total + (subtask.estimatedTime || 0), 0) || 0;
    return (
        <motion.div
            className="taskcard"
            initial="hidden"
            whileHover="hovered"
        >
            <div className="task-info">
                <span className={task.completed ? "line-through opacity-70" : "opacity-100"} >
                    {task.title}
                </span>
                <ActionPane time={taskTime} animationType={"slide"}>
                    <ActionButton icon={<Play size={14} />} onClick={() => { }} />
                    <ActionButton icon={<Pause size={14} />} onClick={() => { }} />
                    <ActionButton
                        icon={<Trash2 size={14} />}
                        onClick={() => { dispatch({ type: "DELETE", payload: { taskId: task.id } }) }} />
                </ActionPane>
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