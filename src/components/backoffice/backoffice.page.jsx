import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import './backoffice.styles.css';

// Iconos SVG como componentes
const ProductsIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

const UsersIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const OrdersIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const StatsIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </svg>
);

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
          <div className="backoffice-icon">
            <ProductsIcon />
          </div>
          <h3>Productos</h3>
          <p>Gestionar catálogo de productos</p>
          <button className="backoffice-btn" onClick={() => navigate('/backoffice/productos')}>
            Administrar
          </button>
        </div>

        <div className="backoffice-card">
          <div className="backoffice-icon">
            <UsersIcon />
          </div>
          <h3>Usuarios</h3>
          <p>Ver y gestionar usuarios</p>
          <button className="backoffice-btn">Administrar</button>
        </div>

        <div className="backoffice-card">
          <div className="backoffice-icon">
            <OrdersIcon />
          </div>
          <h3>Pedidos</h3>
          <p>Revisar pedidos realizados</p>
          <button className="backoffice-btn">Ver pedidos</button>
        </div>

        <div className="backoffice-card">
          <div className="backoffice-icon">
            <StatsIcon />
          </div>
          <h3>Estadísticas</h3>
          <p>Reportes y métricas</p>
          <button className="backoffice-btn">Ver reportes</button>
        </div>
      </div>
    </div>
  );
}

export default BackofficePage;
