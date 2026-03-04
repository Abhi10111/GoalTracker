import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ListContext } from "../../context/ListContext.jsx";
import "../../styles/TaskList.css";
import TaskArea from "../TaskArea.jsx";

export default function TaskList({ listId }) {
    // const { lists } = useContext(ListsContext)
    return (
        <motion.div id={listId} className="task-list">
            <h2>{listId === "today" ? "Today" : "Pending"}</h2>
            <TaskArea listId={listId} />
        </motion.div>
    )
}