import './home.styles.css';

function HomePage() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Bienvenido a PokeStore</h1>
          <p className="hero-subtitle">Tu tienda de confianza para cartas Pokémon</p>
          <button className="hero-button">Ver Colección</button>
        </div>
        <div className="hero-pokeball"></div>
      </section>

      {/* Featured Categories */}
      <section className="categories-section">
        <h2 className="section-title">Categorías Destacadas</h2>
        <div className="categories-grid">
          <div className="category-card">
            <div className="category-icon electric"></div>
            <h3>Cartas Nuevas</h3>
            <p>Las últimas colecciones</p>
          </div>
          <div className="category-card">
            <div className="category-icon star"></div>
            <h3>Cartas Raras</h3>
            <p>Ediciones limitadas</p>
          </div>
          <div className="category-card">
            <div className="category-icon fire"></div>
            <h3>Ofertas</h3>
            <p>Descuentos especiales</p>
          </div>
          <div className="category-card">
            <div className="category-icon diamond"></div>
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
