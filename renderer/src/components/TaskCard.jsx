import React, { useState } from "react";
import { motion } from "framer-motion";
// import { AddTaskBox } from "./Taskutils.jsx";
import { CheckCircle, Trash2, Plus } from "lucide-react";
import CircleCheckbox from "./CheckBox.jsx";
import "./taskcard.css";
import SubtaskHeader from "./SubtaskHeader.jsx";

function SubTasks({ taskId, subtasks, toggleSubtask }) {
    return (
        <motion.div className="subtask-area"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ duration: 0.2 }}
        >
            {subtasks?.map(subtask =>
                <motion.div className="subtask"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeIn" }}
                >
                    <CircleCheckbox
                        isChecked={subtask.completed}
                        onClick={() => toggleSubtask(taskId, subtask.id)}
                    />
                    <span className={subtask.completed ? "line-through opacity-50" : "opacity-100"}> {subtask.task}</span>
                </motion.div>
            )}

        </motion.div>
    )

}

export default function TaskCard({ task, toggleSubtask }) {
    const [subtasksOpen, setSubTaskOpen] = useState(false);
    const [isAddingSubTask, setAddingSubTasks] = useState(false);
    const subtasks = task.subtasks
    const totalSubtasks = subtasks?.length || 0;
    const completedSubtasks = subtasks?.filter(subtask => subtask.completed).length || 0;

    return (
        <motion.div
            className="taskcard"
            whileHover={{ scale: 1.03 }}
        >
            <div className="task-info">
                <span className={task.completed ? "line-through opacity-70" : "opacity-100"} >
                    {task.title}
                </span>
            </div>
            <div className="divider"></div>
            <div className="subtasks">
                <SubtaskHeader
                    totalSubtasks={totalSubtasks}
                    completedSubtasks={completedSubtasks}
                    subtasksOpen={subtasksOpen}
                    onClick={() => setSubTaskOpen(!subtasksOpen)}
                    onClickAddSubtask={()=>setAddingSubTasks(!isAddingSubTask)} />
                {subtasksOpen && <SubTasks subtasks={subtasks} taskId={task.id} toggleSubtask={toggleSubtask} />}
            </div >
            {/* {isAddingSubTask && <AddTaskBox taskSetter={()=>console.log("adding subtask")} onClose={() => setAddingSubTasks(false)} />} */}
        </motion.div >
    )
}