import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../services/auth.service'
import cartService from '../../services/cart.service'
import './navbar.styles.css'

const CartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
)

function Navbar() {
  const navigate = useNavigate()
  const user = authService.getCurrentUser()
  const isAuthenticated = authService.isAuthenticated()
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Cargar cantidad inicial
    setCartCount(cartService.getItemCount())

    // Escuchar cambios en el carrito
    const handleCartUpdate = () => {
      setCartCount(cartService.getItemCount())
    }
    
    window.addEventListener('cartUpdated', handleCartUpdate)
    return () => window.removeEventListener('cartUpdated', handleCartUpdate)
  }, [])

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
          <button className="cart-button" onClick={() => navigate('/carrito')}>
            <CartIcon /> Carrito
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
