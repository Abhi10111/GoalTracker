import React, { useContext } from "react"
import { motion } from "framer-motion";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import CircleCheckbox from "./CheckBox.jsx";
import { IsModifiedToday, TasksContext } from "../context/TaskContext.jsx";
import { ActionPane, ActionButton } from "../utils/UIUtils.jsx";

export function SubTasks({ taskId }) {
    const { tasks, dispatch } = useContext(TasksContext);
    const subtasks = tasks.find(task => task.id === taskId)?.subtasks?.filter(subtask => IsModifiedToday(subtask.lastModified) || !subtask.completed);
    return (
        <motion.div className="subtask-area"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ duration: 0.2 }}
        >
            {subtasks?.map(subtask =>
                <motion.div className="subtask"
                    initial="hidden"
                    whileHover="hovered">
                    <div className="flex items-center" style={{ gap: '5px', width: '70%' }}>
                        <CircleCheckbox
                            isChecked={subtask.completed}
                            onClick={() => dispatch({ type: "TOGGLE_SUBTASK", payload: { taskId: taskId, subtaskId: subtask.id } })}
                        />
                        <span className={subtask.completed ? "line-through opacity-50" : "opacity-100"}> {subtask.task}</span>
                    </div>
                    <ActionPane
                        idle={<motion.span
                            style={{ opacity: 0.5, position: "absolute", pointerEvents: "none" }}
                            variants={{ hovered: { opacity: 0 } }}>
                            {`${subtask.estimatedTime}min`}
                        </motion.span>}
                        animationType={"fade"}>
                        <ActionButton
                            icon={<Trash2 size={14} />}
                            onClick={() => { dispatch({ type: "DELETE", payload: { taskId: taskId, subtaskId: subtask.id } }) }} />
                    </ActionPane>
                </motion.div>
            )}

        </motion.div>
    )

}

export function SubtaskHeader({ taskId, subtasksOpen, onClick, onClickAddSubtask }) {
    const { tasks, _ } = useContext(TasksContext);
    const subtasks = tasks.find(task => task.id === taskId)?.subtasks?.filter(subtask => IsModifiedToday(subtask.lastModified) || !subtask.completed);
    const totalSubtasks = subtasks?.length || 0;
    const completedSubtasks = subtasks?.filter(subtask => subtask.completed).length || 0;

    return (
        <div className="subtasks-header" onClick={onClick}>
            <div className="flex justify-between items-center" style={{ gap: '2px' }}>
                <span>
                    {completedSubtasks}/{totalSubtasks} subtasks
                </span>
                <motion.button
                    whileHover={{ backgroundColor: "#b8b8b8" }}
                    onClick={(e) => {
                        e.stopPropagation()
                        onClickAddSubtask()
                    }}
                >
                    <Plus size={14} color="#5a5a5a" strokeWidth={3} />
                </motion.button>
            </div>
            <ChevronDown className={subtasksOpen ? "rotate-180 opacity-70" : "opacity-30"} color='#5a5a5a' />
        </div>
    )
}