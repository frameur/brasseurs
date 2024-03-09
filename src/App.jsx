import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Tableaubrewers from './pages/Tableaubrewers'
import Historybeer from './pages/Historybeer'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/tableau" element={<Tableaubrewers />} />
        <Route path="/histoire" element={<Historybeer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
