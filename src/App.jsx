import React from 'react';
import WorldClock from './pages/WorldClock'

import "./App.css"
import { NavLink, Route, Routes } from 'react-router-dom'
import StopWatch from './pages/StopWatch';
import Timers from './pages/Timers';
const App = () => {
  return (
    <>
       <div className='top-part'>
            <NavLink to={"/"}>Fulltime</NavLink>
            <NavLink to={"/stopWatch"}>Stop Watch</NavLink>
            <NavLink to={"/timer"}>Timers</NavLink>
        </div>
       <Routes>
        <Route path="/" element={<WorldClock />} />
        <Route path="/stopWatch" element={<StopWatch />} />
        <Route path="/timer" element={<Timers />} />
      </Routes>
    </>
  )
}

export default App