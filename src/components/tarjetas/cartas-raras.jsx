import React from 'react';
import ProductCard from '../product-card/product-card.page.jsx'; 
import '../home/home.styles.css'; 

const CartasRarasPage = () => {
  const rareCards = [
    {
      id: 201,
      name: 'Charizard VMAX',
      description: 'Carta ultra rara holográfica.',
      price: '$85.000',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png'
    },
    {
      id: 202,
      name: 'Pikachu VMAX Rainbow',
      description: 'Edición arcoíris limitada.',
      price: '$95.000',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png'
    },
    {
      id: 203,
      name: 'Mewtwo GX',
      description: 'Carta secreta full art.',
      price: '$75.000',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/150.png'
    }
  ];

  return (
    <div className="home-container">
      <section className="products-section">
        <h1 className="section-title">Cartas Raras</h1>
        <p className="hero-subtitle" style={{textAlign: 'center', color: '#666'}}>
          Ediciones limitadas y cartas de colección exclusivas
        </p>
        
        <div className="products-grid">
          {rareCards.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CartasRarasPage;