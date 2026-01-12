import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import './TaskArea.css'


function AddTaskBox({ taskSetter, onClose }) {
    const [taskTitle, setTaskTitle] = useState("");
    function HandleAdd() {
        taskSetter(prev => {
            const updatedTasks =
                [...prev,
                { id: prev.length + 1, title: taskTitle, subtasks: [] }]
            window.api.updateTasks(updatedTasks);
            return updatedTasks;
        })
        onClose();
    }
    return (
        <motion.div className="add-task-box">
            <input placeholder="Enter task title"
                onChange={(e) => setTaskTitle(e.target.value)}
                onKeyDown={e => {
                    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                        e.preventDefault();
                        HandleAdd();
                    }
                }}
                autoFocus
            />
            <motion.button
                style={{ backgroundColor: "#00ff00", color: "#000000", borderRadius: "20px", padding: "10px 12px", opacity: 0.5 }}
                whileHover={{ opacity: 0.8 }}
                onClick={() => HandleAdd()}
            >
                Confirm
            </motion.button>
        </motion.div>
    )
}
export default function TaskArea() {
    const [tasks, setTasks] = useState([]);
    const [isAddingTask, setAddingTasks] = useState(false);
    function toggleSubtask(taskId, subtaskId) {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? {
                ...task, subtasks: task.subtasks.map(subtask =>
                    subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask)
            } : task
        )
        console.log("upfate")
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "anticipate" }}
            className='task-area'
        >
            {tasks.map(task => <TaskCard task={task} toggleSubtask={toggleSubtask} />)}
            <motion.button onClick={() => setAddingTasks(!isAddingTask)}
                whileHover={{ color: '#b8b8b8' }}
            >
                <Plus strokeWidth={3} size={20} />
                ADD TASK
            </motion.button>
            {isAddingTask && <AddTaskBox taskSetter={setTasks} onClose={() => setAddingTasks(false)} />}
        </motion.div>
    )

}