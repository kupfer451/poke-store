import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import './backoffice.styles.css';

function BackofficePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (!currentUser.isAdmin) {
      navigate('/');
      return;
    }
    
    setUser(currentUser);
  }, [navigate]);

  if (!user) {
    return <div className="backoffice-loading">Cargando...</div>;
  }

  return (
    <div className="backoffice-container">
      <div className="backoffice-header">
        <h1>Panel de Administración</h1>
        <p>Bienvenido, {user.username || user.email}</p>
      </div>

      <div className="backoffice-grid">
        <div className="backoffice-card">
          <h3>📦 Productos</h3>
          <p>Gestionar catálogo de productos</p>
          <button className="backoffice-btn">Administrar</button>
        </div>

        <div className="backoffice-card">
          <h3>👥 Usuarios</h3>
          <p>Ver y gestionar usuarios</p>
          <button className="backoffice-btn">Administrar</button>
        </div>

        <div className="backoffice-card">
          <h3>🛒 Pedidos</h3>
          <p>Revisar pedidos realizados</p>
          <button className="backoffice-btn">Ver pedidos</button>
        </div>

        <div className="backoffice-card">
          <h3>📊 Estadísticas</h3>
          <p>Reportes y métricas</p>
          <button className="backoffice-btn">Ver reportes</button>
        </div>
      </div>
    </div>
  );
}

export default BackofficePage;
