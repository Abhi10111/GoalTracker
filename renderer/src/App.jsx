import React from 'react'
import { useState, useEffect } from 'react'
import { MemoryRouter, Routes, Route } from "react-router-dom";
import './index.css'


import ResizeButton from './components/ResizeButton';
import TaskArea from './components/TaskArea';

import HomePage from './pages/HomePage.jsx';
import Today from './pages/Today.jsx';

function App() {
  return (
    <div className='App'>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/list/:id" element={<ListView />} /> */}
          <Route path="/today" element={<Today />} />
        </Routes>
      </MemoryRouter>
      {/* <SessionProvider>
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
      </SessionProvider > */}
    </div >
  )
}

export default App
