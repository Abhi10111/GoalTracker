import React, { useContext } from "react";
import { motion } from "framer-motion";
import { CircleCheckBig, ClockPlus, Pause, Play, Square, Trash2 } from "lucide-react";
import { TasksContext } from "../context/TaskContext.jsx";
import { SessionContext } from "../context/SessionContext.jsx";

const actionButtonVariants = {
    hovered: { color: "#ffffff" }
};

export function ActionButton({ icon, onClick }) {
    return (
        <motion.button
            variants={actionButtonVariants}
            onClick={onClick}
            whileHover="hovered">
            {icon}
        </motion.button>
    );
}
export default function ActionButtons({ type, taskId, subtaskId, taskTime }) {
    const { _, dispatch } = useContext(TasksContext);
    const { curSession, StartSession, PauseResumeSession, ExtendSession, EndSession } = useContext(SessionContext);
    const isTaskPaused = curSession?.isPaused;
    switch (type) {
        case "complete": return <ActionButton icon={<CircleCheckBig size={14} />} onClick={() => { EndSession(taskId); dispatch({ type: "TOGGLE", payload: { taskId: taskId } }) }} />
        case "delete": return <ActionButton icon={<Trash2 size={14} />} onClick={() => { dispatch({ type: "DELETE", payload: { taskId: taskId, subtaskId: subtaskId ?? null } }) }} />
        case "extend": return <ActionButton icon={<ClockPlus size={14} />} onClick={() => { ExtendSession(taskId); dispatch({ type: "EXTEND", payload: { taskId: taskId } }) }} />
        case "pause_resume": return !isTaskPaused ? <ActionButton icon={<Pause size={14} />} onClick={() => { PauseResumeSession(taskId) }} />
            : <ActionButton icon={<Play size={14} />} onClick={() => { PauseResumeSession(taskId) }} />
        case "start": return <ActionButton icon={<Play size={14} />} onClick={() => { StartSession(taskId, taskTime) }} />
        case "stop": return <ActionButton icon={<Square size={14} />} onClick={() => { EndSession(taskId) }} />
    }

}
