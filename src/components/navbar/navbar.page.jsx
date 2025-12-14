import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../services/auth.service'
import './navbar.styles.css'

function Navbar() {
  const navigate = useNavigate()
  const user = authService.getCurrentUser()
  const isAuthenticated = authService.isAuthenticated()

  const handleLogout = () => {
    authService.logout()
    navigate('/')
    window.location.reload()
  }

  return (
    <header className="site-navbar">
      <div className="navbar-inner">
        <Link className="brand" to="/">PokeStore</Link>

        <nav className="nav-links" aria-label="main navigation">
          <Link to="/">Inicio</Link>
          <Link to="/producto">Productos</Link>
          <Link to="/coleccion">Colección</Link>
          <Link to="/nosotros">Nosotros</Link>
          {user && user.isAdmin && (
            <Link to="/backoffice">Backoffice</Link>
          )}
        </nav>

        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <span className="user-greeting">Hola, {user?.username || user?.email}</span>
              <button className="login-button" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="login-button">Iniciar sesión</button>
            </Link>
          )}
          <button className="login-button" onClick={() => navigate('/carrito')}>Carrito de compras</button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
