import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { TasksContext } from "../context/TaskContext.jsx";
import Cleave from "cleave.js/react";

export default function AddTaskBox({ listId, taskId, onClose }) {
    const [taskTitle, setTaskTitle] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("00:00");
    const { _, dispatch } = useContext(TasksContext);

    function Submit(e) {
        if (e.key === "Enter" && !e.nativeEvent.isComposing) {
            e.preventDefault();
            taskId != null
                ? dispatch({ type: "ADD_SUBTASK", payload: { taskId: taskId, title: taskTitle, time: estimatedTime } })
                : listId === "today"
                    ? dispatch({ type: "ADD_TODAY_TASK", payload: { title: taskTitle, time: estimatedTime } })
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
