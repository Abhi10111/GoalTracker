import React from 'react'
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import TaskCard from './components/TaskCard';
import { MotionConfig } from 'framer-motion'
import { motion } from "framer-motion";


function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    window.api.loadTasks().then(data => {
      setTasks(data);
    });
  }, []);

  return (
    <div className='App'>
      <div className='header'>
        <h1>Today</h1>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "anticipate" }}
        className='task-area'
      >
        {tasks.map(task => <TaskCard task={task} />)}
      </motion.div>
    </div>
  )
}

export default App
