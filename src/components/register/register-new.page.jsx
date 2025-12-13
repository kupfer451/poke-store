import React from 'react';

function NewRegisterPage() {
  return (
    <div style={{ padding: "100px" }}>
      <h1>Página de Registro (Nueva)</h1>
      <form>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default NewRegisterPage;
