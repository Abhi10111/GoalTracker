import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import "./taskcard.css";
import { SubTasks, SubtaskHeader } from "./SubtaskComponents.jsx";
import { TasksContext } from "../context/TaskContext.jsx";
import { ActionButton, ActionPane, Clock, AddTaskBox } from "../utils/UIUtils.jsx";
import { Play, Pause, Trash2, CircleCheckBig } from "lucide-react";
import { SessionContext } from "../context/SessionContext.jsx";

export default function TaskCard({ task }) {
    const [subtasksOpen, setSubTaskOpen] = useState(false);
    const [isAddingSubTask, setAddingSubTasks] = useState(false);
    const { _, dispatch } = useContext(TasksContext);
    const { curSession, StartSession, EndSession } = useContext(SessionContext);
    const taskTime = task.subtasks?.reduce((total, subtask) => !subtask.completed ? total + (subtask.estimatedTime || 0) : 0, 0) || 0;
    const isTaskActive = curSession?.taskId === task.id;

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
                {isTaskActive &&
                    <ActionPane
                        idle={<Clock remainingSec={curSession.remainingSec} />}
                        animationType={"slide"}>
                        <ActionButton icon={<Pause size={14} />} onClick={() => { }} />
                        <ActionButton icon={<CircleCheckBig size={14} />} onClick={() => { EndSession() }} />
                    </ActionPane>}
                {!isTaskActive &&
                    <ActionPane
                        idle={<motion.span
                            style={{ opacity: 0.5, position: "absolute", pointerEvents: "none", display: "block", textAlign: "right" }}
                            variants={{ hovered: { opacity: 0 } }}>
                            {`${taskTime || 0}min`}
                        </motion.span>}
                        animationType={"slide"}>
                        <ActionButton icon={<Play size={14} />} onClick={() => { StartSession(task.id, taskTime) }} />
                        <ActionButton
                            icon={<Trash2 size={14} />}
                            onClick={() => { dispatch({ type: "DELETE", payload: { taskId: task.id } }) }} />
                    </ActionPane>}
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