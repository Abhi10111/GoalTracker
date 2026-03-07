import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from 'lucide-react';
import AddTaskBox from "./AddTaskBox.jsx";

export default function AddTaskButton({ listId }) {
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
