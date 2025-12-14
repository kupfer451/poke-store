import React from 'react';
import ProductCard from '../product-card/product-card.page.jsx'; 
import '../home/home.styles.css'; 

const CartasNuevasPage = () => {

  const newCards = [
    {
      id: 101,
      name: 'Sprigatito',
      description: 'Pokémon Gato Planta. Primera edición Escarlata.',
      price: '$12.000',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/906.png'
    },
    {
      id: 102,
      name: 'Fuecoco',
      description: 'Pokémon Cocodrilo Fuego. Carta holográfica.',
      price: '$12.000',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/909.png'
    },
    {
      id: 103,
      name: 'Quaxly',
      description: 'Pokémon Patito Agua. Edición coleccionista.',
      price: '$12.000',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/912.png'
    },
    {
      id: 104,
      name: 'Koraidon ex',
      description: 'Legendario de Paldea. Ultra Rara.',
      price: '$45.000',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/1007.png'
    },
    {
      id: 105,
      name: 'Miraidon ex',
      description: 'Legendario del futuro. Full Art.',
      price: '$48.000',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/1008.png'
    }
  ];

  return (
    <div className="home-container">
      
      <section className="products-section">
        <h1 className="section-title">Últimos Lanzamientos</h1>
        <p className="hero-subtitle" style={{textAlign: 'center', color: '#666'}}>
            Descubre las cartas más recientes de la expansión Escarlata y Púrpura
        </p>
        
        <div className="products-grid">
          {newCards.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CartasNuevasPage;