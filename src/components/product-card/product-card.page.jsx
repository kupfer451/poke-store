import React, { useState } from 'react';
import cartService from '../../services/cart.service';

const ProductCard = ({ product }) => {
  const [showAdded, setShowAdded] = useState(false);

  const handleAddToCart = () => {
    // Preparar el producto con el formato correcto para el carrito
    const productForCart = {
      id: product.id,
      product_name: product.product_name || product.name,
      price: typeof product.price === 'string' 
        ? parseFloat(product.price.replace(/[^0-9.-]+/g, '')) 
        : product.price,
      image_url: product.image_url || product.imageUrl,
    };

    cartService.addToCart(productForCart);

    setShowAdded(true);

    setTimeout(() => {
      setShowAdded(false);
    }, 1000);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image_url || product.imageUrl} alt={product.product_name || product.name} />
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.product_name || product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-footer">
          <span className="product-price">
            {typeof product.price === 'number' 
              ? new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(product.price)
              : product.price
            }
          </span>
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