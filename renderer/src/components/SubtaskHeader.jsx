import React from "react"
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Plus } from "lucide-react";

export default function SubtaskHeader({ totalSubtasks, completedSubtasks, subtasksOpen, onClick,onClickAddSubtask }) {
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