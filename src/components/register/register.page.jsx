import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../login/login.styles.css'

function RegisterPage() {
  const navigate = useNavigate()

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Crear cuenta</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Nombre</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button">Registrarse</button>
            <Link to="/login">
              <button type="button" className="submit-button">¿Ya tienes cuenta? Inicia sesión</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
