import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Trash2, ChevronDown, Plus } from "lucide-react";
import CircleCheckbox from "./CheckBox.jsx";
import "./taskcard.css";


export default function TaskCard({ task }) {
    const [subtasksOpen, setSubTaskOpen] = useState(false);
    const [subtasks, setSubTasks] = useState(task.subtasks)
    const totalSubtasks = task.subtasks?.length || 0;

    function toggleSubtask(id) {
        setSubTasks(subtasks.map(s =>
            s.id === id
                ? { ...s, completed: !s.completed }
                : s));
    }
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
                <div className="subtasks-header">
                    <div className="flex justify-between items-center">
                        <span>
                            0/{totalSubtasks} subtasks
                        </span>
                        {/* <motion.button
                            whileHover={{ scale: 1.2 }}
                        >
                            <Plus className="opacity-30 w-24 h-24" />
                        </motion.button> */}
                    </div>
                    <motion.button
                        onClick={() => setSubTaskOpen(!subtasksOpen)}
                    >
                        <ChevronDown className={subtasksOpen ? "rotate-180 opacity-70" : "opacity-30"} color='#5a5a5a' />
                    </motion.button>

                </div>
                {subtasksOpen && (
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
                                    onClick={() => toggleSubtask(subtask.id)}
                                />
                                <span className={subtask.completed? "line-through opacity-50": "opacity-100"}> {subtask.task}</span>
                            </motion.div>
                        )}

                    </motion.div>
                )
                }
            </div >
        </motion.div >
    )
}