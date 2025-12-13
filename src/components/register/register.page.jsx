import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../login/login.styles.css';

function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    rut: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
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

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial.'
      );
      return;
    }

    setError('');
    // Simulate a successful registration
    console.log('Registration successful');
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Crear cuenta</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
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
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button">
              Registrarse
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
