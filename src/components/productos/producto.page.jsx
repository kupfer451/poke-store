import React from 'react';
import ProductCard from '../product-card/product-card.page.jsx'; 
import './producto.styles.css';

const ProductoPage = () => {
  const products = [
    { id: 1, name: 'Bulbasaur', description: 'Hay una semilla de planta en su espalda...', price: '$15.000', imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png' },
    { id: 2, name: 'Charmander', description: 'La llama que arde en la punta de su cola...', price: '$15.000', imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png' },
    { id: 3, name: 'Squirtle', description: 'Cuando retrae su largo cuello en su caparazón...', price: '$15.000', imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png' },
    { id: 4, name: 'Pikachu', description: 'Tiene pequeñas bolsas eléctricas...', price: '$25.000', imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png' },
    { id: 5, name: 'Jigglypuff', description: 'Cuando sus enormes ojos se tambalean...', price: '$20.000', imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/039.png' },
    { id: 6, name: 'Gengar', description: 'Para robar la vida de su presa...', price: '$30.000', imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/094.png' },
    { id: 7, name: 'Eevee', description: 'Gracias a su composición genética...', price: '$40.000', imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/133.png' },
    { id: 8, name: 'Snorlax', description: 'No está satisfecho a menos que coma...', price: '$50.000', imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/143.png' }
  ];

  return (
    <div className="products-section">
      <h1 className="section-title">Productos</h1>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductoPage;