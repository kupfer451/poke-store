import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.styles.css';

const ProductCard = ({ product }) => {
  const [showAdded, setShowAdded] = useState(false);

  const handleAddToCart = () => {
    console.log(`Agregado: ${product.name}`);

    setShowAdded(true);

    setTimeout(() => {
      setShowAdded(false);
    }, 1000);
  };

  return (
    <div className="product-card">
      <div className="product-image"></div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">{product.price}</span>
          <button className="add-to-cart" onClick={handleAddToCart}>
            Agregar al Carrito
          </button>
        </div>
      </div>
      
      {/* Mensaje */}
      {showAdded && (
        <div className="mensaje-exito">Producto agregado al carrito</div>
      )}
    </div>
  );
};

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: 'Pikachu VMAX',
      description: 'Carta holográfica rara',
      price: '$29.990'
    },
    {
      id: 2,
      name: 'Charizard GX',
      description: 'Edición especial',
      price: '$49.990'
    },
    {
      id: 3,
      name: 'Mewtwo EX',
      description: 'Carta promocional',
      price: '$19.990'
    },
    {
      id: 4,
      name: 'Eevee Evoluciones',
      description: 'Set completo',
      price: '$89.990'
    }
  ];


  const categories = [
    { id: 1, image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png', title: 'Cartas Nuevas', description: 'Las últimas colecciones' },
    { id: 2, image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png', title: 'Cartas Raras', description: 'Ediciones limitadas' },
    { id: 3, image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/149.png', title: 'Ofertas', description: 'Descuentos especiales' },
    { id: 4, image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/150.png', title: 'Accesorios', description: 'Accesorios para tus cartas' }
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

      <section className="categories-section">
        <h2 className="section-title">Nuevos Productos</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="category-card">
              <img src={cat.image} alt={cat.title} className="category-image" />
              <h3>{cat.title}</h3>
              <p>{cat.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="products-section">
        <h2 className="section-title">Productos Destacados</h2>
        <div className="products-grid">
          {/*Renderizar prod*/}
          {products.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;