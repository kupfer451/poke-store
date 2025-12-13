import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbar.styles.css'

function Navbar() {
  const navigate = useNavigate()

  return (
    <header className="site-navbar">
      <div className="navbar-inner">
        <Link className="brand" to="/">PokeStore</Link>

        <nav className="nav-links" aria-label="main navigation">
          <Link to="/">Inicio</Link>
          <Link to="/producto">Productos</Link>
          <Link to="/nosotros">Nosotros</Link>
        </nav>

        <div className="nav-actions">
          <Link to="/login">
            <button className="login-button"> Iniciar sesión </button>
          </Link>
          <button className="login-button" onClick={() => navigate('/carrito')}>Carrito de compras</button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
