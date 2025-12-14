import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../../services/auth.service';
import ordersService from '../../../services/orders.service';
import productsService from '../../../services/products.service';
import './ordenes-admin.styles.css';

// Iconos SVG
const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const DeleteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// Estados disponibles para las órdenes
const ORDER_STATUSES = [
  { value: 'pending', label: 'Pendiente', color: '#f39c12' },
  { value: 'paid', label: 'Pagada', color: '#3498db' },
  { value: 'shipped', label: 'Enviada', color: '#9b59b6' },
  { value: 'delivered', label: 'Entregada', color: '#27ae60' },
  { value: 'cancelled', label: 'Cancelada', color: '#e74c3c' },
];

function OrdenesAdminPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Verificar permisos de admin
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user || !user.isAdmin) {
      navigate('/');
      return;
    }
    loadOrders();
  }, [navigate]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await ordersService.getAll();
      setOrders(data);
      
      // Cargar información de productos para mostrar nombres
      await loadProductsInfo(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadProductsInfo = async (ordersData) => {
    // Obtener IDs únicos de productos de todas las órdenes
    const productIds = new Set();
    ordersData.forEach(order => {
      order.items?.forEach(item => {
        productIds.add(item.product_id);
      });
    });

    // Cargar información de cada producto
    const productsMap = {};
    for (const productId of productIds) {
      try {
        const product = await productsService.getById(productId);
        productsMap[productId] = product;
      } catch (err) {
        productsMap[productId] = { product_name: 'Producto no disponible' };
      }
    }
    setProducts(productsMap);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setError('');
    setSuccess('');

    try {
      await ordersService.updateStatus(orderId, newStatus);
      setSuccess('Estado actualizado correctamente');
      
      // Actualizar la orden en el estado local
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      
      // Actualizar también la orden seleccionada si está abierta
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm('¿Estás seguro de eliminar esta orden? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      await ordersService.delete(orderId);
      setSuccess('Orden eliminada correctamente');
      setOrders(orders.filter(order => order.id !== orderId));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(null);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusInfo = (status) => {
    return ORDER_STATUSES.find(s => s.value === status) || { 
      value: status, 
      label: status, 
      color: '#95a5a6' 
    };
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  if (loading) {
    return <div className="ordenes-admin-loading">Cargando órdenes...</div>;
  }

  return (
    <div className="ordenes-admin-container">
      <div className="ordenes-admin-header">
        <h1>Gestión de Órdenes</h1>
        <button className="btn-back" onClick={() => navigate('/backoffice')}>
          ← Volver al Backoffice
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="ordenes-admin-actions">
        <div className="filter-box">
          <label>Filtrar por estado:</label>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Todos</option>
            {ORDER_STATUSES.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
        <div className="orders-count">
          Total: {filteredOrders.length} {filteredOrders.length === 1 ? 'orden' : 'órdenes'}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="no-orders">
          <p>No hay órdenes {filterStatus !== 'all' ? `con estado "${getStatusInfo(filterStatus).label}"` : ''}</p>
        </div>
      ) : (
        <div className="ordenes-table-container">
          <table className="ordenes-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => {
                const statusInfo = getStatusInfo(order.status);
                return (
                  <tr key={order.id}>
                    <td className="order-id">{order.id.substring(0, 8)}...</td>
                    <td>{formatDate(order.created_at)}</td>
                    <td className="order-total">{formatPrice(order.total_amount)}</td>
                    <td>
                      <select
                        className="status-select"
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        style={{ 
                          backgroundColor: statusInfo.color,
                          color: 'white'
                        }}
                      >
                        {ORDER_STATUSES.map(status => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="order-address" title={order.shipping_address}>
                      {order.shipping_address?.substring(0, 30)}
                      {order.shipping_address?.length > 30 ? '...' : ''}
                    </td>
                    <td className="order-actions">
                      <button 
                        className="btn-icon btn-view" 
                        onClick={() => setSelectedOrder(order)}
                        title="Ver detalles"
                      >
                        <EyeIcon />
                      </button>
                      <button 
                        className="btn-icon btn-delete" 
                        onClick={() => handleDelete(order.id)}
                        title="Eliminar"
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de detalle de orden */}
      {selectedOrder && (
        <div className="order-detail-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="order-detail-container" onClick={(e) => e.stopPropagation()}>
            <div className="order-detail-header">
              <h2>Detalle de Orden</h2>
              <button className="btn-close" onClick={() => setSelectedOrder(null)}>
                <CloseIcon />
              </button>
            </div>

            <div className="order-detail-content">
              <div className="order-info-grid">
                <div className="order-info-item">
                  <span className="label">ID de Orden:</span>
                  <span className="value">{selectedOrder.id}</span>
                </div>
                <div className="order-info-item">
                  <span className="label">ID de Usuario:</span>
                  <span className="value">{selectedOrder.user_id}</span>
                </div>
                <div className="order-info-item">
                  <span className="label">Fecha:</span>
                  <span className="value">{formatDate(selectedOrder.created_at)}</span>
                </div>
                <div className="order-info-item">
                  <span className="label">Estado:</span>
                  <span 
                    className="value status-badge"
                    style={{ backgroundColor: getStatusInfo(selectedOrder.status).color }}
                  >
                    {getStatusInfo(selectedOrder.status).label}
                  </span>
                </div>
                <div className="order-info-item full-width">
                  <span className="label">Dirección de envío:</span>
                  <span className="value">{selectedOrder.shipping_address || 'No especificada'}</span>
                </div>
                {selectedOrder.notes && (
                  <div className="order-info-item full-width">
                    <span className="label">Notas:</span>
                    <span className="value">{selectedOrder.notes}</span>
                  </div>
                )}
              </div>

              <h3>Productos de la orden</h3>
              <div className="order-items-table-container">
                <table className="order-items-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio Unit.</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items?.map(item => (
                      <tr key={item.id}>
                        <td className="product-name">
                          {products[item.product_id]?.product_name || 'Cargando...'}
                        </td>
                        <td>{formatPrice(item.unit_price)}</td>
                        <td className="quantity">{item.quantity}</td>
                        <td className="subtotal">{formatPrice(item.subtotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="total-label">Total:</td>
                      <td className="total-value">{formatPrice(selectedOrder.total_amount)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="order-detail-actions">
                <label>Cambiar estado:</label>
                <select
                  className="status-select large"
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                  style={{ 
                    backgroundColor: getStatusInfo(selectedOrder.status).color,
                    color: 'white'
                  }}
                >
                  {ORDER_STATUSES.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdenesAdminPage;
