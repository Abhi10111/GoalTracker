import React from "react";
import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Plus } from 'lucide-react';
import { isModifiedToday, TasksContext } from '../context/TaskContext.jsx';
import { AddTaskBox,formatMinutesToHMString } from "../utils/UIUtils.jsx";
import TaskCard from './TaskCard';
import './TaskArea.css'

export default function TaskArea() {
    const { tasks } = useContext(TasksContext);
    const [isAddingTask, setAddingTasks] = useState(false);
    const tasksToShow = tasks.filter(task => !task.completed || isModifiedToday(task.completed))
    const incompleteTasks = tasksToShow.filter(task => !task.completed)
    const completedTasks = tasksToShow.filter(task => task.completed)
    const completedMins = completedTasks.reduce((sum, task) => { return sum + (task.estimatedTime || 0); }, 0);
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "anticipate" }}
            className='task-area'
        >
            {
                incompleteTasks?.map(task =>
                    <TaskCard task={task} />
                )
            }
            <motion.button onClick={() => setAddingTasks(!isAddingTask)}
                whileHover={{ color: '#b8b8b8' }}
            >
                <Plus strokeWidth={3} size={20} />
                ADD TASK
            </motion.button>
            {isAddingTask && <AddTaskBox onClose={() => setAddingTasks(false)} />}
            <div className='task-area-divider' />
            <div className='completed-info'>
                <span>{completedTasks?.length} Done</span>
                <span>{formatMinutesToHMString(completedMins)}</span>
            </div>
            {
                completedTasks?.map(task =>
                    <TaskCard task={task} />
                )
            }
        </motion.div>
    )

}