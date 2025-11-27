import React from 'react'
import { NavLink } from 'react-router-dom'

function Aheader() {
  return (
    <>
<nav className="navbar navbar-expand-lg shadow-sm sticky-top bg-white">
  <div className="container-fluid">
    <a className="navbar-brand fw-bold ps-5 fs-2" href="#">Personal Shape</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul className="navbar-nav pe-5 gap-4">
        <li className="nav-item"><NavLink className="nav-link " to="/">Home</NavLink></li>
        <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
        <li className="nav-item"><NavLink className="nav-link" to="/port">Portfolio</NavLink></li>
        <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
      </ul>
    </div>
  </div>
</nav>


    </>
  )
}

export default Aheader