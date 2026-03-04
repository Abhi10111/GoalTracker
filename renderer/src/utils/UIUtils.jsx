import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { TasksContext } from "../context/TaskContext.jsx";
import { Plus } from 'lucide-react';
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

export function AddTaskBox({ listId, taskId, onClose }) {
    const [taskTitle, setTaskTitle] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("00:00");
    const { _, dispatch } = useContext(TasksContext);

    function Submit(e) {
        if (e.key === "Enter" && !e.nativeEvent.isComposing) {
            e.preventDefault();
            taskId != null
                ? dispatch({ type: "ADD_SUBTASK", payload: { taskId: taskId, title: taskTitle, time: estimatedTime } })
                : dispatch({ type: "ADD_TASK", payload: { title: taskTitle, time: estimatedTime, listId: listId } });
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

export function AddTaskButton({ listId }) {
    const [isAddingTask, setAddingTasks] = useState(false);
    const buttonStyle = {
        margin: "0.5rem 0",
        width: "fit-content",
        display: "flex",
        alignItems: "center",
        padding: "7px",
        gap: "3px",
        backgroundColor: "rgba(64, 64, 64, 0.2)",
        color: "#808080",
        fontSize: "16px",
        fontWeight: 700,
        borderRadius: "4px",
    }
    return (
        <>
            <motion.button onClick={() => setAddingTasks(!isAddingTask)}
                whileHover={{ color: '#b8b8b8' }}
                style={buttonStyle}
            >
                <Plus strokeWidth={3} size={20} />
                ADD TASK
            </motion.button>
            {isAddingTask && <AddTaskBox listId={listId} onClose={() => setAddingTasks(false)} />}
        </>
    )
}
export function formatMinutesToHMString(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) return `${minutes}m`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}m`;
}
