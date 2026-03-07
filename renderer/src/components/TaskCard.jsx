import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import "./taskcard.css";
import TaskCardActions from "./TaskCardActions.jsx";
import TaskCardSubtasks from "./TaskCardSubtasks.jsx";
import { TasksContext } from "../context/TaskContext.jsx";

export default function TaskCard({ task, isInTodayList }) {
    const { markTaskForToday } = useContext(TasksContext);
    const completedSubtaskTime = task.subtasks?.filter(sub => sub.completed).reduce((total, sub) => total + (sub.estimatedTime ?? 0), 0) ?? 0;
    const taskTime = task.estimatedTime - completedSubtaskTime;
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
        >
            <div className={"task-info"}>
                <span className={task.completed ? "line-through opacity-70" : "opacity-100"} >
                    {task.title}
                </span>
                <TaskCardActions task={task} isInTodayList={isInTodayList} taskTime={taskTime} />
            </div>
            <TaskCardSubtasks task={task} />
        </motion.div >
    )
}