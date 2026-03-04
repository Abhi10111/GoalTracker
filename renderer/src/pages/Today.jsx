import React, { useState, useEffect } from 'react'
import FocusedTask from '../components/FocusedTask.jsx'
import ResizeButton from '../components/ResizeButton.jsx'
import TaskArea from '../components/TaskArea.jsx'
import { House } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"


export default function Today() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        window.api.resize(collapsed ? "collapsedtasks" : "fulltasks");
    }, [collapsed]);
    return (
        <>
            {collapsed ?
                <FocusedTask unFocus={() => setCollapsed(!collapsed)} />
                : <>
                    <div className='header'>
                        <h1>Today</h1>
                        <div style={{display:"flex"}}>
                            {
                                !collapsed &&
                                <>
                                    <motion.button
                                        onClick={() => {
                                            navigate('/')}} >
                                        <House color='#808080' />
                                    </motion.button>
                                </>
                            }
                            <ResizeButton collapsed={collapsed} onClick={() => setCollapsed(!collapsed)} />
                        </div>
                    </div>
                    <TaskArea listId={"today"} />
                </>
            }
        </>
    )
}