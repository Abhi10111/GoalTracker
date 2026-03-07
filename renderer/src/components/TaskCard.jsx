import React, { useState, useContext } from "react";
import ActionButtons from "./ActionButtons.jsx";
import { motion } from "framer-motion";
import "./taskcard.css";
import { SubTasks, SubtaskHeader } from "./SubtaskComponents.jsx";
import { ActionPane, Clock, AddTaskBox, formatMinutesToHMString } from "../utils/UIUtils.jsx";
import { SessionContext } from "../context/SessionContext.jsx";
import { TasksContext } from "../context/TaskContext.jsx";

export default function TaskCard({ task, isInTodayList }) {
    const [subtasksOpen, setSubTaskOpen] = useState(false);
    const [isAddingSubTask, setAddingSubTasks] = useState(false);
    const { curSession } = useContext(SessionContext);
    const { markTaskForToday } = useContext(TasksContext);
    const completedSubtaskTime = task.subtasks?.filter(sub => sub.completed).reduce((total, sub) => total + (sub.estimatedTime ?? 0), 0) ?? 0;
    const taskTime = task.estimatedTime - completedSubtaskTime;
    const isTaskActive = curSession?.taskId === task.id;
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnd = (info) => {
        setIsDragging(false);

        const todayArea = document.getElementById("today-drop-zone");
        if (!todayArea) return;

        const todayRect = todayArea.getBoundingClientRect();
        const x = info.x;
        const y = info.y;

        const isInside =
            x >= todayRect.left &&
            x <= todayRect.right &&
            y >= todayRect.top &&
            y <= todayRect.bottom;

        if (isInside) {
            markTaskForToday(task.id);
        }
    };

    return (
        <motion.div
            layout
            className="taskcard"
            transition={{
                layout: { duration: 0.25, ease: "easeOut" }
            }}
            initial="hidden"
            whileHover={!isDragging ? "hovered" : undefined}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={1}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            whileDrag={{
                scale: 1.03,
                boxShadow: "0px 8px 25px rgba(0,0,0,0.5)",
                zIndex: 1000
            }}
        >            <div className={"task-info"}>
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
                                {
                                    isInTodayList &&
                                    <ActionButtons type="start" taskId={task.id} taskTime={taskTime} />
                                }
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