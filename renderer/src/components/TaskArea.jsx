import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import './TaskArea.css'

export default function TaskArea() {
    const [tasks, setTasks] = useState([]);

    function toggleSubtask(taskId, subtaskId) {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? {
                ...task, subtasks: task.subtasks.map(subtask =>
                    subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask)
            } : task
        )

        setTasks(updatedTasks);
        window.api.updateTasks(updatedTasks);
    }

    useEffect(() => {
        window.api.loadTasks().then(data => {
            setTasks(data);
        });
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "anticipate" }}
            className='task-area'
        >
            {tasks.map(task => <TaskCard task={task} toggleSubtask={toggleSubtask} />)}
            <button >
                <Plus strokeWidth={3} size={20}/>
                ADD TASK
            </button>
        </motion.div>
    )

}