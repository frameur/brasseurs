import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Historybeer from './pages/Historybeer'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/histoire" element={<Historybeer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
