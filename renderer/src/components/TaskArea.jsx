import React from "react";
import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Plus } from 'lucide-react';
import { TasksContext, AddTaskBox } from './Taskutils.jsx';
import TaskCard from './TaskCard';
import './TaskArea.css'

export default function TaskArea() {
    const { tasks, dispatch } = useContext(TasksContext);
    const [isAddingTask, setAddingTasks] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "anticipate" }}
            className='task-area'
        >
            {tasks?.map(task =>
                <TaskCard task={task} />
            )}
            <motion.button onClick={() => setAddingTasks(!isAddingTask)}
                whileHover={{ color: '#b8b8b8' }}
            >
                <Plus strokeWidth={3} size={20} />
                ADD TASK
            </motion.button>
            {isAddingTask && <AddTaskBox onClose={() => setAddingTasks(false)} />}
        </motion.div>
    )

}