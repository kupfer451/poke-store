import React from 'react'
import { useNavigate } from 'react-router-dom'
import './register.styles.css'

function RegisterPage() {
  const navigate = useNavigate()

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Crear cuenta</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Nombre de usuario</label>
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
          <div className="form-group">
            <label htmlFor="confirm-password">Confirmar contraseña</label>
            <input type="password" id="confirm-password" name="confirm-password" />
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button">Registrarse</button>
            <button type="button" className="login-button-secondary" onClick={() => navigate('/login')}>¿Ya tienes cuenta? Inicia sesión</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
