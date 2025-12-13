import React from 'react';
import '../login/login.styles.css';
import './carrito.styles.css';
import '../home/home.styles.css';

function CarritoPage() {
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
        <div className="cart-items">
          {/* Placeholder for cart items */}
          <p>No hay productos en tu carrito.</p>
        </div>
        <div className="cart-summary">
          <h3>Resumen del Pedido</h3>
          <p>Subtotal: $0.00</p>
          <p>Envío: $0.00</p>
          <h4>Total: $0.00</h4>
          <div className="checkout-button-container">
            <button className="submit-button">Finalizar Compra</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarritoPage;
