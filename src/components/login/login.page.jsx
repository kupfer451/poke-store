import { Link } from 'react-router-dom'
import './login.styles.css'

function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Iniciar sesión</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button">Iniciar sesión</button>
            <Link to="/register">
              <button type="button" className="submit-button">Crear cuenta nueva</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  ) 
}

export default LoginPage
