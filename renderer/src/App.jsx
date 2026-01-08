import React from 'react'
import { useState, useEffect } from 'react'
import { Minimize2 } from 'lucide-react';
import './index.css'

import { MotionConfig } from 'framer-motion'
import { motion } from "framer-motion";
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
        <motion.button
          onClick={() => setCollapsed(!collapsed)} >
          <Minimize2 color='#808080' />
        </motion.button>
      </div>
      {!collapsed && <TaskArea/>}
    </div>
  )
}

export default App
