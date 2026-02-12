import React, { useContext } from 'react';
import ActionButtons from './ActionButtons.jsx';
import { motion } from 'framer-motion';
import { SessionContext } from '../context/SessionContext.jsx';
import { TasksContext } from '../context/TaskContext.jsx';
import { ActionPane } from '../utils/UIUtils.jsx';
import { Maximize2 } from "lucide-react";
import { Clock } from '../utils/UIUtils.jsx';
import './FocusedTask.css';

function drag(e) {
    if (e.target.closest("button")) {
        return;
    }

    window.api.startDrag();
    const mouseUp = (ev) => {
        window.removeEventListener('mousemove', window.api.drag)
        window.removeEventListener("mouseup", mouseUp, true);
    }

    window.addEventListener('mousemove', window.api.drag)
    window.addEventListener('mouseup', mouseUp, true)
}
export default function FocusedTask({ unFocus }) {
    const { curSession } = useContext(SessionContext);
    const { tasks } = useContext(TasksContext);
    const focusedTask = tasks.find(task => task.id === curSession?.taskId);

    return (
        <motion.div className="focused-task"
            initial="hidden"
            whileHover="hovered"
            onMouseDown={drag}>
            <span className={focusedTask?.completed ? "line-through opacity-70" : "opacity-100"} >
                {focusedTask?.title ?? "No Task Active"}
            </span>
            <ActionPane
                idle={<Clock remainingSec={curSession?.remainingSec ?? 0} />}
                animationType={"slide"}>
                {focusedTask && <ActionButtons type="pause_resume" taskId={focusedTask.id}/>}
                {focusedTask && <ActionButtons type="extend" taskId={focusedTask.id} />}
                {focusedTask && <ActionButtons type="complete" taskId={focusedTask.id} />}
                <motion.button
                    variants={{ hovered: { color: "#ffffff" } }}
                    onClick={() => unFocus()}
                    whileHover="hovered">
                    <Maximize2 size={14} />
                </motion.button>
            </ActionPane>
        </motion.div >
    );
}