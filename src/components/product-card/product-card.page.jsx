import React, { useState } from 'react';

const ProductCard = ({ product }) => {
  const [showAdded, setShowAdded] = useState(false);

  const handleAddToCart = () => {
    console.log(`Agregaste a ${product.name}`);

    setShowAdded(true);

    setTimeout(() => {
      setShowAdded(false);
    }, 1000);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-footer">
          <span className="product-price">{product.price}</span>
          <button className="add-to-cart" onClick={handleAddToCart}>
            Agregar al Carrito
          </button>
        </div>
      </div>

      {showAdded && (
        <div className="mensaje-exito">
          Producto agregado
        </div>
      )}
    </div>
  );
};

export default ProductCard;