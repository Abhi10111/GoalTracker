import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { TasksContext } from "../context/TaskContext.jsx";
import Cleave from "cleave.js/react";


const actionVariants = {
    "slide": {
        hidden: {
            opacity: 0,
            x: 12
        },
        hovered: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.2,
                ease: "easeOut",
            },
        },
    },
    "fade": {
        hidden: {
            opacity: 0,
        },
        hovered: {
            opacity: 1,
            transition: {
                duration: 0.2,
                ease: "easeOut",
            }
        }

    }
};

export function Clock({ remainingSec }) {
    const hours = Math.floor(remainingSec / 3600);
    const minutes = Math.floor((remainingSec % 3600) / 60);
    const seconds = remainingSec % 60;

    return (
        <motion.div
            className="clock"
            style={{ position: "absolute", pointerEvents: "none" }}
            variants={{ hovered: { opacity: 0 } }}
        >
            {String(hours).padStart(2, "0")}:
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
        </motion.div>
    );
}

export function ActionPane({ idle, children, animationType }) {
    return (
        <div className="flex items-center justify-end" style={{ position: "relative", width: "40%" }}>
            {idle}
            <motion.div className="actions"
                variants={actionVariants[animationType]}>
                {children}
            </motion.div>
        </div>
    )
}

export function AddTaskBox({ taskId, onClose }) {
    const [taskTitle, setTaskTitle] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("00:00");
    const { _, dispatch } = useContext(TasksContext);

    function Submit(e) {
        if (e.key === "Enter" && !e.nativeEvent.isComposing) {
            e.preventDefault();
            taskId != null
                ? dispatch({ type: "ADD_SUBTASK", payload: { taskId: taskId, title: taskTitle, time: estimatedTime } })
                : dispatch({ type: "ADD_TASK", payload: { title: taskTitle, time: estimatedTime } });
            onClose();
        }
    }
    return (
        <motion.div className="add-task-box">
            <input className="title-input"
                placeholder="Enter task title"
                onChange={(e) => setTaskTitle(e.target.value)}
                onKeyDown={e => Submit(e)}
                autoFocus
            />
            <Cleave
                className="estimated-time-input"
                options={{
                    time: true,
                    timePattern: ["h", "m"]
                }}
                placeholder="HH:MM"
                onChange={(e) => setEstimatedTime(e.target.value)}
                onKeyDown={(e) => Submit(e)}
            />
        </motion.div>
    )
}
