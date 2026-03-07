// There is a bug that action pane stays with the timing





import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ActionPane, Clock } from "./common/AnimatedUI.jsx";
import ActionButtons from "./ActionButtons.jsx";
import { formatMinutesToHMString } from "../utils/formatters.js";
import { SessionContext } from "../context/SessionContext.jsx";

export default function TaskCardActions({ task, isInTodayList, taskTime }) {
    const { curSession } = useContext(SessionContext);
    const isTaskActive = curSession?.taskId === task.id;

    if (task.completed) {
        return (
            <motion.span
                style={{ opacity: 0.5, pointerEvents: "none", display: "block", textAlign: "right" }}>
                {formatMinutesToHMString(task.estimatedTime)}
            </motion.span>
        );
    }

    return (
        <>
            {isTaskActive &&
                <ActionPane
                    idle={<Clock remainingSec={curSession.remainingSec} />}
                    animationType={"slide"}>
                    <ActionButtons type="pause_resume" taskId={task.id} />
                    <ActionButtons type="stop" taskId={task.id} />
                    <ActionButtons type="extend" taskId={task.id} />
                    <ActionButtons type="complete" taskId={task.id} />
                </ActionPane>}
            {!isTaskActive &&
                <ActionPane
                    idle={<motion.span
                        style={{ opacity: 0.5, position: "absolute", pointerEvents: "none", display: "block", textAlign: "right" }}
                        variants={{ hovered: { opacity: 0 } }}>
                        {formatMinutesToHMString(taskTime)}
                    </motion.span>}
                    animationType={"slide"}>
                    {
                        isInTodayList &&
                        <ActionButtons type="start" taskId={task.id} taskTime={taskTime} />
                    }
                    <ActionButtons type="delete" taskId={task.id} />
                </ActionPane>}
        </>
    )
}
