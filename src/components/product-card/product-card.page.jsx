import React from 'react';
import './product-card.styles.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      {product.badge && <div className="product-badge">{product.badge}</div>}
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">{product.price}</p>
        <button className="add-to-cart-btn">Agregar al Carrito</button>
      </div>
    </div>
  );
};

export default ProductCard;
