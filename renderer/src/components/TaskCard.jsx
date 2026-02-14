import React, { useState, useContext } from "react";
import ActionButtons from "./ActionButtons.jsx";
import { motion } from "framer-motion";
import "./taskcard.css";
import { SubTasks, SubtaskHeader } from "./SubtaskComponents.jsx";
import { ActionPane, Clock, AddTaskBox, formatMinutesToHMString } from "../utils/UIUtils.jsx";
import { SessionContext } from "../context/SessionContext.jsx";

export default function TaskCard({ task }) {
    const [subtasksOpen, setSubTaskOpen] = useState(false);
    const [isAddingSubTask, setAddingSubTasks] = useState(false);
    const { curSession } = useContext(SessionContext);
    const completedSubtaskTime = task.subtasks?.filter(sub => sub.completed).reduce((total, sub) => total + (sub.estimatedTime ?? 0), 0) ?? 0;
    const taskTime = task.estimatedTime-completedSubtaskTime;
    const isTaskActive = curSession?.taskId === task.id;

    return (
        <motion.div
            className="taskcard"
            initial="hidden"
            whileHover="hovered"
        >
            <div className={"task-info"}>
                <span className={task.completed ? "line-through opacity-70" : "opacity-100"} >
                    {task.title}
                </span>
                {task.completed ?
                    <motion.span
                        style={{ opacity: 0.5, pointerEvents: "none", display: "block", textAlign: "right" }}>
                        {formatMinutesToHMString(task.estimatedTime)}
                    </motion.span> :
                    <>
                        {isTaskActive &&
                            <ActionPane
                                idle={<Clock remainingSec={curSession.remainingSec} />}
                                animationType={"slide"}>
                                <ActionButtons type="pause_resume" taskId={task.id} />
                                <ActionButtons type="stop" taskId={task.id} />
                                <ActionButtons type="extend" taskId={task.id} />
                                <ActionButtons type="complete" taskId={task.id} />
                            </ActionPane>}
                        {!isTaskActive &&
                            <ActionPane
                                idle={<motion.span
                                    style={{ opacity: 0.5, position: "absolute", pointerEvents: "none", display: "block", textAlign: "right" }}
                                    variants={{ hovered: { opacity: 0 } }}>
                                    {formatMinutesToHMString(taskTime)}
                                </motion.span>}
                                animationType={"slide"}>
                                <ActionButtons type="start" taskId={task.id} taskTime={taskTime} />
                                <ActionButtons type="delete" taskId={task.id} />
                            </ActionPane>}
                    </>
                }
            </div>
            {!task.completed &&
                <>
                    <div className="divider" />
                    <div className="subtasks">
                        <SubtaskHeader
                            taskId={task.id}
                            subtasksOpen={subtasksOpen}
                            onClick={() => setSubTaskOpen(!subtasksOpen)}
                            onClickAddSubtask={() => setAddingSubTasks(!isAddingSubTask)} />
                        {subtasksOpen &&
                            <SubTasks taskId={task.id} />}
                    </div >
                    {isAddingSubTask && <AddTaskBox taskId={task.id} onClose={() => setAddingSubTasks(false)} />}
                </>
            }
        </motion.div >
    )
}