import React, { useState } from 'react';
import '../login/login.styles.css';
import './carrito.styles.css';
import '../home/home.styles.css';

function CarritoPage() {
  const [mensajeCompra, setMensajeCompra] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState(''); // 'success' o 'error'
  const [cartItems, setCartItems] = useState([]); // vacío por defecto

  const handleFinalizarCompra = () => {
    if (cartItems.length === 0) {
      setMensajeCompra('No hay productos seleccionados');
      setTipoMensaje('error');
    } else {
      setMensajeCompra('¡Compra realizada exitosamente! Gracias por tu compra.');
      setTipoMensaje('success');
    }
    setTimeout(() => setMensajeCompra(''), 5000);
  };
  return (
    <div className="cart-container">
      <div className="product-card">
        <div className="product-image"></div>
        <div className="product-info">
          <h3 className="product-name">Producto de Ejemplo</h3>
          <p className="product-description">
            Aquí puedes ver los detalles del producto que estás comprando.
          </p>
        </div>
      </div>
      <div className="login-form">
        <h2 className="cart-title">Carrito de Compras</h2>
        
        <div className="checkout-form">
          <h3>Información de Envío</h3>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nombre Completo</label>
              <input type="text" id="name" name="name" />
            </div>
            <div className="form-group">
              <label htmlFor="address">Dirección</label>
              <input type="text" id="address" name="address" />
            </div>
            <div className="form-group">
              <label htmlFor="city">Ciudad</label>
              <input type="text" id="city" name="city" />
            </div>

          </form>
        </div>

        <div className="cart-items">
          {/* Placeholder for cart items */}
        </div>
        <div className="cart-summary">
          <h3>Resumen del Pedido</h3>
          <p>Subtotal: $0.00</p>
          <p>Envío: $0.00</p>
          <h4>Total: $0.00</h4>
          <div className="checkout-button-container">
            <button className="submit-button" onClick={handleFinalizarCompra}>Finalizar Compra</button>
          </div>
        </div>

        {mensajeCompra && (
          <div className={`message ${tipoMensaje === 'success' ? 'success-message' : 'error-message'}`}>
            {mensajeCompra}
          </div>
        )}
      </div>
    </div>
  );
}

export default CarritoPage;
