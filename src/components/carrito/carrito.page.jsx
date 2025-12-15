import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cartService from '../../services/cart.service';
import ordersService from '../../services/orders.service';
import authService from '../../services/auth.service';
import './carrito.styles.css';

// Iconos SVG
const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const MinusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const CartEmptyIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const CartIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const LocationIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const ClipboardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
  </svg>
);

const PackageIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

function CarritoPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const [shippingData, setShippingData] = useState({
    address: '',
    city: '',
    notes: '',
  });

  const SHIPPING_COST = 3990;

  useEffect(() => {
    loadCart();
    
    const handleCartUpdate = () => loadCart();
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const loadCart = () => {
    const items = cartService.getCart();
    setCartItems(items);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      cartService.removeFromCart(productId);
    } else {
      cartService.updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    cartService.removeFromCart(productId);
    showMessage('Producto eliminado del carrito', 'info');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingData({ ...shippingData, [name]: value });
  };

  const showMessage = (text, type) => {
    setMensaje(text);
    setTipoMensaje(type);
    setTimeout(() => setMensaje(''), 5000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price);
  };

  const subtotal = cartService.getSubtotal();
  const total = subtotal + (cartItems.length > 0 ? SHIPPING_COST : 0);

  const handleFinalizarCompra = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      showMessage('No hay productos en el carrito', 'error');
      return;
    }

    const user = authService.getCurrentUser();
    if (!user) {
      showMessage('Debes iniciar sesión para realizar la compra', 'error');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    if (!shippingData.address.trim() || !shippingData.city.trim()) {
      showMessage('Por favor completa la dirección y ciudad', 'error');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        shipping_address: `${shippingData.address}, ${shippingData.city}`,
        notes: shippingData.notes,
        items: cartService.prepareOrderItems(),
      };

      const order = await ordersService.create(orderData);
      
      cartService.clearCart();
      
      showMessage(`¡Orden creada exitosamente! ID: ${order.id.substring(0, 8)}...`, 'success');
      
      setShippingData({ address: '', city: '', notes: '' });
      
    } catch (error) {
      showMessage(error.message || 'Error al procesar la orden', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="carrito-page">
      <div className="carrito-container">
        <h1 className="carrito-title"><CartIcon /> Mi Carrito</h1>

        {cartItems.length === 0 ? (
          <div className="carrito-empty">
            <CartEmptyIcon />
            <h2>Tu carrito está vacío</h2>
            <p>¡Agrega algunos productos para comenzar!</p>
            <button className="btn-continue-shopping" onClick={() => navigate('/producto')}>
              Ver Productos
            </button>
          </div>
        ) : (
          <div className="carrito-content">
            <div className="carrito-items">
              <h2>Productos ({cartItems.length})</h2>
              
              {cartItems.map(item => (
                <div key={item.id} className="carrito-item">
                  <div className="item-image">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.product_name} />
                    ) : (
                      <div className="item-placeholder"><PackageIcon /></div>
                    )}
                  </div>
                  
                  <div className="item-details">
                    <h3>{item.product_name}</h3>
                    <p className="item-price">{formatPrice(item.price)}</p>
                  </div>
                  
                  <div className="item-quantity">
                    <button 
                      className="qty-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      <MinusIcon />
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <PlusIcon />
                    </button>
                  </div>
                  
                  <div className="item-subtotal">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                  
                  <button 
                    className="btn-remove"
                    onClick={() => handleRemoveItem(item.id)}
                    title="Eliminar"
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>

            <div className="carrito-sidebar">
              <div className="shipping-form">
                <h2><LocationIcon /> Información de Envío</h2>
                <form onSubmit={handleFinalizarCompra}>
                  <div className="form-group">
                    <label htmlFor="address">Dirección:</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={shippingData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="city">Ciudad:</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={shippingData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="notes">Especificaciones (opcional):</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={shippingData.notes}
                      onChange={handleInputChange}
                      rows="3"
                    />
                  </div>
                </form>
              </div>

              <div className="order-summary">
                <h2><ClipboardIcon /> Resumen del Pedido</h2>
                
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                <div className="summary-row">
                  <span>Envío</span>
                  <span>{formatPrice(SHIPPING_COST)}</span>
                </div>
                
                <div className="summary-row total">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <button 
                  className="btn-checkout"
                  onClick={handleFinalizarCompra}
                  disabled={loading || cartItems.length === 0}
                >
                  {loading ? 'Procesando...' : 'Finalizar Compra'}
                </button>

                <button 
                  className="btn-clear-cart"
                  onClick={() => {
                    if (window.confirm('¿Estás seguro de vaciar el carrito?')) {
                      cartService.clearCart();
                      showMessage('Carrito vaciado', 'info');
                    }
                  }}
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </div>
        )}

        {mensaje && (
          <div className={`carrito-message ${tipoMensaje}`}>
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}

export default CarritoPage;
