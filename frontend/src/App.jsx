import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css'

import Home from './pages/Home';
import Temple from './pages/Temple';
import AddBrick from './pages/AddBrick';
import SilentOffering from './pages/SilentOfferings';
import WorkWithMe from './pages/WorkWithMe';
import BuyPrashad from './pages/BuyPrashad';
import ParticleBackground from './components/utils/ParticleBackground';
import GitaQuote from './components/GitaQuote';
import NavBar from './components/utils/NavBar';

function App() {


  return (
    <div className="bg-black">
      <ParticleBackground />
      <NavBar />
      <div className=''>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/temple" element={<Temple />} />
          <Route path="add-brick" element={<AddBrick />} />
          <Route path="/silent-offering" element={<SilentOffering />} />
          <Route path="/work-with-me" element={<WorkWithMe />} />
          <Route path="/buy-prashad" element={<BuyPrashad />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <GitaQuote />
    </div>
  )
}

export default App
