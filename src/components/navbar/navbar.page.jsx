import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbar.styles.css'

function Navbar() {
  const navigate = useNavigate()

  return (
    <header className="site-navbar">
      <div className="navbar-inner">
        <div className="brand">PokeStore</div>

        <nav className="nav-links" aria-label="main navigation">
          <Link to="/">Inicio</Link>
          <a href="#productos">Productos</a>
          <a href="#nosotros">Nosotros</a>
        </nav>

        <div className="nav-actions">
          <button className="login-button" onClick={() => navigate('/login')}>Iniciar sesión</button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
