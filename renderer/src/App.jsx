import React from 'react'
import { useState, useEffect } from 'react'
import { TaskProvider } from './components/Taskutils.jsx'
import './index.css'

import { MotionConfig } from 'framer-motion'
import ResizeButton from './components/ResizeButton';
import TaskArea from './components/TaskArea';

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
      {!collapsed &&
        <TaskProvider>
          <TaskArea />
        </TaskProvider>
      }
    </div>
  )
}

export default App
