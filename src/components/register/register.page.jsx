import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import '../login/login.styles.css';

function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    rut: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Limpiar errores al escribir
    if (error) setError('');
  };

  // Validar email en tiempo real (con debounce)
  const checkEmailAvailability = async (email) => {
    try {
      const result = await authService.checkEmail(email);
      if (!result.available) {
        setError('Este correo electrónico ya está registrado');
        return false;
      }
      return true;
    } catch (err) {
      console.error('Error al verificar email:', err);
      return true; // Continuar si hay error de red
    }
  };

  // Validar RUT en tiempo real
  const checkRutAvailability = async (rut) => {
    try {
      const result = await authService.checkRut(rut);
      if (!result.available) {
        setError('Este RUT ya está registrado');
        return false;
      }
      return true;
    } catch (err) {
      console.error('Error al verificar RUT:', err);
      return true; // Continuar si hay error de red
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, rut } = formData;
    
    if (!username || !email || !password || !rut) {
      setError('Todos los campos son obligatorios');
      return;
    }

    const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/;
    if (!rutRegex.test(rut)) {
      setError('El formato del RUT no es válido. Debe ser XX.XXX.XXX-X');
      return;
    }

    const rutNumbers = rut.split('-')[0].replace(/\./g, '');
    if (/^(\d)\1+$/.test(rutNumbers)) {
      setError('El RUT no es válido, los números no pueden ser todos iguales.');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial.'
      );
      console.log(password);
      console.log(passwordRegex.test(password));
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Verificar disponibilidad de email y RUT
      const [emailAvailable, rutAvailable] = await Promise.all([
        checkEmailAvailability(email),
        checkRutAvailability(rut)
      ]);

      if (!emailAvailable || !rutAvailable) {
        setLoading(false);
        return;
      }

      // Registrar usuario
      await authService.register(formData);
      setSuccess('¡Cuenta creada exitosamente! Redirigiendo al login...');
      
      // Redirigir al login después de 2 segundos
      // setTimeout(() => {
      //   navigate('/login');
      // }, 2000);
    } catch (err) {
      setError(err.message || 'Error al crear la cuenta. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Crear cuenta</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <div className="form-group">
            <label htmlFor="username">Nombre</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="rut">RUT</label>
            <input
              type="text"
              id="rut"
              name="rut"
              value={formData.rut}
              onChange={handleChange}
              placeholder="11.111.111-1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
            <Link to="/login">
              <button type="button" className="submit-button">
                ¿Ya tienes cuenta? Inicia sesión
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
