import React from 'react';
import ProductCard from '../product-card/product-card.page.jsx';
import './producto.styles.css';

const ProductoPage = () => {
  const products = [
    {
      id: 1,
      name: 'Bulbasaur',
      description: 'Hay una semilla de planta en su espalda desde el día en que nació.',
      price: '$15.00',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png',
      badge: 'Nuevo'
    },
    {
      id: 2,
      name: 'Charmander',
      description: 'La llama que arde en la punta de su cola es una indicación de sus emociones.',
      price: '$15.00',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png',
      badge: 'Popular'
    },
    {
      id: 3,
      name: 'Squirtle',
      description: 'Cuando retrae su largo cuello en su caparazón, dispara agua a una presión increíble.',
      price: '$15.00',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png',
      badge: ''
    },
    {
        id: 4,
        name: 'Pikachu',
        description: 'Tiene pequeñas bolsas eléctricas en ambas mejillas. Si se siente amenazado, las descarga.',
        price: '$25.00',
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png',
        badge: 'Destacado'
      },
        {
        id: 5,
        name: 'Jigglypuff',
        description: 'Cuando sus enormes ojos se tambalean, canta una misteriosa melodía que adormece.',
        price: '$20.00',
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/039.png',
        badge: ''
      },
      {
        id: 6,
        name: 'Gengar',
        description: 'Para robar la vida de su presa, se desliza en su sombra y espera en silencio.',
        price: '$30.00',
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/094.png',
        badge: 'Popular'
      },
        {
        id: 7,
        name: 'Eevee',
        description: 'Gracias a su composición genética irregular, puede evolucionar de muchas maneras.',
        price: '$40.00',
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/133.png',
        badge: 'Raro'
      },
      {
        id: 8,
        name: 'Snorlax',
        description: 'No está satisfecho a menos que coma más de 880 libras de comida cada día.',
        price: '$50.00',
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/143.png',
        badge: ''
      }
    ];

  return (
    <div className="product-page-container">
      <h1 className="product-page-title">Productos</h1>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductoPage;
