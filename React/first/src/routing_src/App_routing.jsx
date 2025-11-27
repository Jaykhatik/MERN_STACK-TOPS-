import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Aheader from './components/Aheader';
import Home1 from './pages/Home1';
import Afooter from './components/Afooter';
import Contact1 from './pages/Contact1';
import About1 from './pages/About1';
import Portfolio1 from './pages/Portfolio';
import './App_routing.css';

function App_routing() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<><Aheader /><Home1 /><Afooter /></>}></Route>
          <Route path='/about' element={<><Aheader /><About1 /><Afooter /></>}></Route>
          <Route path='/port' element={<><Aheader /><Portfolio1 /><Afooter /></>}></Route>
          <Route path='/contact' element={<><Aheader /><Contact1 /><Afooter /></>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App_routing;