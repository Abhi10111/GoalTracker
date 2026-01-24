import React from 'react'
import { useState, useEffect } from 'react'
import { TaskProvider } from './context/TaskContext.jsx'
import './index.css'

import { MotionConfig } from 'framer-motion'
import ResizeButton from './components/ResizeButton';
import TaskArea from './components/TaskArea';
import { SessionProvider } from './context/SessionContext.jsx'

function App() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    window.api.resize(collapsed);
  }, [collapsed]);

  return (
    <div className='App'>
      <div className='header'>
        <h1>Today</h1>
        <ResizeButton collapsed={collapsed} onClick={() => setCollapsed(!collapsed)} />
      </div>
      <SessionProvider>
        {!collapsed &&
          <TaskProvider>
            <TaskArea />
          </TaskProvider>
        }
      </SessionProvider>
    </div>
  )
}

export default App
