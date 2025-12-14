import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../product-card/product-card.page.jsx'; // Asegúrate de importar ProductCard si lo sacaste a otro archivo
import './home.styles.css';

function HomePage() {
  const navigate = useNavigate();

  // Array de categorías actualizado con la propiedad 'path'
  const categories = [
    { 
      id: 1, 
      image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png', 
      title: 'Cartas Nuevas', 
      description: 'Las últimas colecciones',
      path: '/cartas-nuevas' // <--- RUTA NUEVA
    },
    { 
      id: 2, 
      image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png', 
      title: 'Cartas Raras', 
      description: 'Ediciones limitadas',
      path: '/productos' // Puedes dirigir a productos o crear otra pag
    },
    { 
      id: 3, 
      image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/149.png', 
      title: 'Ofertas', 
      description: 'Descuentos especiales',
      path: '/ofertas' 
    },
    { 
      id: 4, 
      image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/150.png', 
      title: 'Accesorios', 
      description: 'Accesorios para tus cartas',
      path: '/accesorios'
    }
  ];

  // Función para manejar el click en la categoría
  const handleCategoryClick = (path) => {
    if (path) {
      navigate(path);
      window.scrollTo(0, 0); // Para que la nueva página empiece desde arriba
    }
  };

  const products = [
    { id: 1, name: 'Pikachu VMAX', description: 'Carta holográfica rara', price: '$29.990' },
    { id: 2, name: 'Charizard GX', description: 'Edición especial', price: '$49.990' },
    { id: 3, name: 'Mewtwo EX', description: 'Carta promocional', price: '$19.990' },
    { id: 4, name: 'Eevee Evoluciones', description: 'Set completo', price: '$89.990' }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Bienvenido a PokeStore</h1>
          <p className="hero-subtitle">Tu tienda de confianza para cartas Pokémon</p>
        </div>
        <div className="hero-pokeball"></div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Nuevos Productos</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="category-card" 
              onClick={() => handleCategoryClick(cat.path)} // <--- AQUÍ ESTÁ LA MAGIA
              style={{ cursor: 'pointer' }} // Para que aparezca la manito al pasar el mouse
            >
              <img src={cat.image} alt={cat.title} className="category-image" />
              <h3>{cat.title}</h3>
              <p>{cat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <h2 className="section-title">Productos Destacados</h2>
        <div className="products-grid">
          {products.map((prod) => (
             // Asumiendo que ProductCard lo importas o lo defines arriba como tenías antes
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;