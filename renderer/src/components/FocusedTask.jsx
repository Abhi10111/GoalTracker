import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { SessionContext } from '../context/SessionContext.jsx';
import { TasksContext } from '../context/TaskContext.jsx';
import { ActionPane, ActionButton } from '../utils/UIUtils.jsx';
import { Play, Pause, CircleCheckBig, Maximize2 } from "lucide-react";
import { Clock } from '../utils/UIUtils.jsx';
import './FocusedTask.css';

export default function FocusedTask({ unFocus }) {
    const { curSession, _, PauseResumeSession, EndSession } = useContext(SessionContext);
    const { tasks, __ } = useContext(TasksContext);
    const focusedTask = tasks.find(task => task.id === curSession?.taskId);
    const isTaskPaused = curSession?.isPaused;

    return (
        <motion.div className="focused-task"
            initial="hidden"
            whileHover="hovered">
            <span className={focusedTask?.completed ? "line-through opacity-70" : "opacity-100"} >
                {focusedTask?.title ?? "No Task Active"}
            </span>
            <ActionPane
                idle={<Clock remainingSec={curSession?.remainingSec ?? 0} />}
                animationType={"slide"}>
                {!isTaskPaused ? <ActionButton icon={<Pause size={14} />} onClick={() => { PauseResumeSession(focusedTask.id) }} />
                    : <ActionButton icon={<Play size={14} />} onClick={() => { PauseResumeSession(focusedTask.id) }} />}
                <ActionButton icon={<CircleCheckBig size={14} />} onClick={() => { EndSession(focusedTask.id) }} />
                <ActionButton icon={<Maximize2 size={14} />} onClick={() => { unFocus() }} />
            </ActionPane>
        </motion.div >
    );
}