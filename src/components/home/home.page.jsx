import React, { useState } from 'react';
import './home.styles.css';

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    {
      id: 1,
      image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png',
      title: 'Cartas Nuevas',
      description: 'Las últimas colecciones',
      alt: 'Cartas Nuevas'
    },
    {
      id: 2,
      image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png',
      title: 'Cartas Raras',
      description: 'Ediciones limitadas',
      alt: 'Cartas Raras'
    },
    {
      id: 3,
      image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/149.png',
      title: 'Ofertas',
      description: 'Descuentos especiales',
      alt: 'Ofertas'
    },
    {
      id: 4,
      image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/150.png',
      title: 'Accesorios',
      description: 'Accesorios para tus cartas',
      alt: 'Accesorios'
    }
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
  };
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

      {/* Featured Categories */}
      <section className="categories-section">
        <h2 className="section-title">Categorías Destacadas</h2>
        <div className="categories-grid">
          <div className="category-card">
            <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png" alt="Cartas Nuevas" className="category-image" />
            <h3>Cartas Nuevas</h3>
            <p>Las últimas colecciones</p>
          </div>
          <div className="category-card">
            <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png" alt="Cartas Raras" className="category-image" />
            <h3>Cartas Raras</h3>
            <p>Ediciones limitadas</p>
          </div>
          <div className="category-card">
            <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/149.png" alt="Ofertas" className="category-image" />
            <h3>Ofertas</h3>
            <p>Descuentos especiales</p>
          </div>
          <div className="category-card">
            <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/150.png" alt="Accesorios" className="category-image" />
            <h3>Accesorios</h3>
            <p>Accesorios para tus cartas</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <h2 className="section-title">Productos Destacados</h2>
        <div className="products-grid">
          <div className="product-card">
            <div className="product-image">
            </div>
            <div className="product-info">
              <h3 className="product-name">Pikachu VMAX</h3>
              <p className="product-description">Carta holográfica rara</p>
              <div className="product-footer">
                <span className="product-price">$29.99</span>
                <button className="add-to-cart">Añadir</button>
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
            </div>
            <div className="product-info">
              <h3 className="product-name">Charizard GX</h3>
              <p className="product-description">Edición especial</p>
              <div className="product-footer">
                <span className="product-price">$49.99</span>
                <button className="add-to-cart">Añadir</button>
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
            </div>
            <div className="product-info">
              <h3 className="product-name">Mewtwo EX</h3>
              <p className="product-description">Carta promocional</p>
              <div className="product-footer">
                <span className="product-price">$19.99</span>
                <button className="add-to-cart">Añadir</button>
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image"></div>
            <div className="product-info">
              <h3 className="product-name">Eevee Evoluciones</h3>
              <p className="product-description">Set completo</p>
              <div className="product-footer">
                <span className="product-price">$89.99</span>
                <button className="add-to-cart">Añadir</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
