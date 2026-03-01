import React from 'react'
import { useState, useEffect } from 'react'
import { MemoryRouter, Routes, Route } from "react-router-dom";
import './index.css'
import './App.css'
import { TaskProvider } from './context/TaskContext.jsx';
import { ListProvider } from './context/ListContext.jsx';
import { SessionProvider } from './context/SessionContext.jsx';

import HomePage from './pages/HomePage.jsx';
import Today from './pages/Today.jsx';
// import ListView from './pages/ListView.jsx';

function App() {
  return (
    <div className='App'>
      <SessionProvider>
        <ListProvider>
          <TaskProvider>
            <MemoryRouter initialEntries={["/"]}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                {/* <Route path="/list/:id" element={<ListView />} /> */}
                <Route path="/today" element={<Today />} />
              </Routes>
            </MemoryRouter>
          </TaskProvider>
        </ListProvider>
      </ SessionProvider>
    </div >
  )
}

export default App
