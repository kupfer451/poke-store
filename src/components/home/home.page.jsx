import React, { useState } from 'react';
import './home.styles.css';

function HomePage() {
  const [productsIndex, setProductsIndex] = useState(0);

  const handlePrevProducts = () => {
    setProductsIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const handleNextProducts = () => {
    setProductsIndex((prev) => (prev < 4 ? prev + 1 : prev));
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
        <h2 className="section-title">Nuevos Productos</h2>
        <div className="categories-grid">
          <div className="category-card">
            <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/906.png" alt="Nuevos Productos" className="category-image" />
            <h3>Sprigatito</h3>
            <p><strong>Tipo:</strong> Planta</p>
            <p><strong>Región:</strong> Paldea</p>
            <p><strong>Descripción:</strong> Pokémon felino que hechiza con sus movimientos</p>
          </div>
          <div className="category-card">
            <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/909.png" alt="Nuevos Productos" className="category-image" />
            <h3>Fuecoco</h3>
            <p><strong>Tipo:</strong> Fuego</p>
            <p><strong>Región:</strong> Paldea</p>
            <p><strong>Descripción:</strong> Pequeño caimán con espíritu combativo</p>
          </div>
          <div className="category-card">
            <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/912.png" alt="Nuevos Productos" className="category-image" />
            <h3>Quaxly</h3>
            <p><strong>Tipo:</strong> Agua</p>
            <p><strong>Región:</strong> Paldea</p>
            <p><strong>Descripción:</strong> Pato elegante y orgulloso de su apariencia</p>
          </div>
          <div className="category-card">
            <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/925.png" alt="Nuevos Productos" className="category-image" />
            <h3>Pawmi</h3>
            <p><strong>Tipo:</strong> Eléctrico</p>
            <p><strong>Región:</strong> Paldea</p>
            <p><strong>Descripción:</strong> Roedor eléctrico con mejillas brillantes</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <h2 className="section-title">Productos Destacados</h2>
        <div className="products-carousel-container">
          <button className="carousel-btn carousel-btn-prev" onClick={handlePrevProducts}>❮</button>
          <div className="products-carousel-wrapper">
            <div className="products-carousel" style={{ transform: `translateX(calc(-${productsIndex} * 50%))` }}>
              <div className="product-card">
                <div className="product-image">
                  <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png" alt="Pikachu VMAX" />
                  <div className="product-badge">NUEVO</div>
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
                  <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png" alt="Charizard GX" />
                  <div className="product-badge rare">RARO</div>
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
                  <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/150.png" alt="Mewtwo EX" />
                  <div className="product-badge promo">OFERTA</div>
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
                <div className="product-image">
                  <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/133.png" alt="Eevee Evoluciones" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">Eevee Evoluciones</h3>
                  <p className="product-description">Set completo</p>
                  <div className="product-footer">
                    <span className="product-price">$89.99</span>
                    <button className="add-to-cart">Añadir</button>
                  </div>
                </div>
              </div>

              <div className="product-card">
                <div className="product-image">
                  <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/149.png" alt="Dragonite" />
                  <div className="product-badge">DESTACADO</div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">Dragonite GX</h3>
                  <p className="product-description">Dragón legendario</p>
                  <div className="product-footer">
                    <span className="product-price">$55.99</span>
                    <button className="add-to-cart">Añadir</button>
                  </div>
                </div>
              </div>

              <div className="product-card">
                <div className="product-image">
                  <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/003.png" alt="Venusaur" />
                  <div className="product-badge rare">RARO</div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">Venusaur EX</h3>
                  <p className="product-description">Poder de la naturaleza</p>
                  <div className="product-footer">
                    <span className="product-price">$45.99</span>
                    <button className="add-to-cart">Añadir</button>
                  </div>
                </div>
              </div>

              <div className="product-card">
                <div className="product-image">
                  <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/009.png" alt="Blastoise" />
                  <div className="product-badge promo">OFERTA</div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">Blastoise VMAX</h3>
                  <p className="product-description">Maestro del agua</p>
                  <div className="product-footer">
                    <span className="product-price">$39.99</span>
                    <button className="add-to-cart">Añadir</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="carousel-btn carousel-btn-next" onClick={handleNextProducts}>❯</button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
