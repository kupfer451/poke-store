import React from 'react'
import './navbar.styles.css'

function Navbar() {
  return (
    <header className="site-navbar">
      <div className="navbar-inner">
        <div className="brand">PokeStore</div>

        <nav className="nav-links" aria-label="main navigation">
          <a href="#">Inicio</a>
          <a href="#productos">Productos</a>
          <a href="#nosotros">Nosotros</a>
        </nav>

        <div className="nav-actions">
          <button className="login-button">Iniciar sesión</button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
