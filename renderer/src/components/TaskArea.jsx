import React, { useContext } from "react";
import { motion } from "framer-motion";
import { isModifiedToday, TasksContext } from '../context/TaskContext.jsx';
import { AddTaskButton, formatMinutesToHMString } from "../utils/UIUtils.jsx";
import TaskCard from './TaskCard';
import './TaskArea.css'

export default function TaskArea({ listId }) {
    const { getTaskbyListId } = useContext(TasksContext)
    const tasks = getTaskbyListId(listId) || []
    console.log(tasks)
    const tasksToShow = tasks.filter(task => !task.completed || isModifiedToday(task.completed))
    const incompleteTasks = tasksToShow.filter(task => !task.completed)
    const completedTasks = tasksToShow.filter(task => task.completed)
    const completedMins = completedTasks.reduce((sum, task) => { return sum + (task.estimatedTime || 0); }, 0);
    return (
        <motion.div
            id={listId === "today" ? "today-drop-zone" : undefined}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "anticipate" }}
            className='task-area'
        >
            {
                incompleteTasks?.map(task =>
                    <TaskCard key={task.id} task={task} isInTodayList={listId === "today"} />
                )
            }
            <AddTaskButton listId={listId} />
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