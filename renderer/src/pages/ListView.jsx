import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import "../styles/ListView.css"
import "../styles/Homepage.css"
import TaskList from "../components/listview/TaskList";
// import TodayTaskList from "../components/listview/TodayTaskList";
import { ListContext } from "../context/ListContext";
import NavigationPane from "../components/common/NavigationPane";

export default function ListView() {
    const { id } = useParams();
    const { getListById } = useContext(ListContext)
    const list = getListById(id)
    useEffect(() => {
        window.api.resize("listview");
    }, []);
    return (
        <motion.div className="listview">
            <div className="listview-header">
                <h1>{list?.name}</h1>
                <NavigationPane />
            </div>
            <div className="tasklists">
                <TaskList listId={id} />
                <TaskList listId={"today"} />
            </ div>
        </motion.div>
    )
}