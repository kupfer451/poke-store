import React from 'react';
import ProductCard from '../product-card/product-card.page.jsx';
import './coleccion.styles.css';

const ColeccionPage = () => {
  const collections = [
    {
      id: 1,
      name: 'Charizard',
      description: 'Dragón legendario de fuego',
      price: '$45.00',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png',
    },
    {
      id: 2,
      name: 'Blastoise',
      description: 'Tortuga maestra del agua',
      price: '$45.00',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/009.png',
    },
    {
      id: 3,
      name: 'Venusaur',
      description: 'Poder de la naturaleza combinado',
      price: '$45.00',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/003.png',
    },
    {
      id: 4,
      name: 'Dragonite',
      description: 'Dragón completamente evolucionado',
      price: '$55.00',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/149.png',
    },
    {
      id: 5,
      name: 'Lapras',
      description: 'Gigante del hielo y el agua',
      price: '$50.00',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/131.png',
    },
    {
      id: 6,
      name: 'Articuno',
      description: 'Legendario del hielo',
      price: '$75.00',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/144.png',
    },
    {
      id: 7,
      name: 'Zapdos',
      description: 'Legendario del rayo',
      price: '$75.00',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/145.png',
    },
    {
      id: 8,
      name: 'Moltres',
      description: 'Legendario del fuego',
      price: '$75.00',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/146.png',
    },
    {
      id: 9,
      name: 'Mewtwo',
      description: 'Pokémon supremo',
      price: '$100.00',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/150.png',
    },
    {
      id: 10,
      name: 'Mew',
      description: 'Pokémon místico y legendario',
      price: '$120.00',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/151.png',
    }
  ];

  return (
    <div className="collections-section">
      <h1 className="section-title">Colección</h1>
      <div className="collections-grid">
        {collections.map(collection => (
          <ProductCard key={collection.id} product={collection} />
        ))}
      </div>
    </div>
  );
};

export default ColeccionPage;
