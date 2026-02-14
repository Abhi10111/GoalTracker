import React, { useState, useEffect } from 'react'
import FocusedTask from '../components/FocusedTask.jsx'
import ResizeButton from '../components/ResizeButton.jsx'
import TaskArea from '../components/TaskArea.jsx'
import { TaskProvider } from '../context/TaskContext.jsx'
import { SessionProvider } from '../context/SessionContext.jsx'
export default function Today() {
    const [collapsed, setCollapsed] = useState(false);
    useEffect(() => {
        window.api.resize(collapsed);
    }, [collapsed]);
    return (
        <SessionProvider>
            <TaskProvider>
                {collapsed ?
                    <FocusedTask unFocus={() => setCollapsed(!collapsed)} />
                    : <>
                        <div className='header'>
                            <h1>Today</h1>
                            <ResizeButton collapsed={collapsed} onClick={() => setCollapsed(!collapsed)} />
                        </div>
                        <TaskArea />
                    </>
                }
            </TaskProvider>
        </SessionProvider>
    )
}