import React from 'react';
import './carrito.styles.css';

function CarritoPage() {
  return (
    <div className="cart-container">
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
        <button className="checkout-button">Finalizar Compra</button>
      </div>
    </div>
  );
}

export default CarritoPage;
