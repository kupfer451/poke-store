import React, { useState } from 'react'
import './login.styles.css'

function LoginPage() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    // Aquí podrías integrar autenticación real
    console.log('Login intento:', { name, password })
    alert(`Intento de inicio de sesión: ${name}`)
  }

  return (
    <main className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>

        <label className="label">
          Nombre
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            required
          />
        </label>

        <label className="label">
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tu contraseña"
            required
          />
        </label>

        <button type="submit" className="submit-button">Entrar</button>
      </form>
    </main>
  )
}

export default LoginPage
