import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/home';
import Add from './pages/Add';
import Update from './pages/Update';
import Read from './pages/Read';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Add />} />
        <Route path='/update/:id' element={<Update />} />
        <Route path='/read/:id' element={<Read />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App