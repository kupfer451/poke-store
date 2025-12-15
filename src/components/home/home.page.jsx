import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../product-card/product-card.page.jsx'; 
import './home.styles.css';

function HomePage() {
  const navigate = useNavigate();

  const categories = [
    { 
      id: 1, 
      image: 'https://media.discordapp.net/attachments/1449463615391531199/1450101151566663740/Cartas.png?ex=69414f70&is=693ffdf0&hm=45140adf39c3b067413cf77ddd6b7bd208686c2602bf0ef9fe1a770e5fecc823&=&format=webp&quality=lossless', 
      title: 'Cartas Nuevas', 
      description: 'Cartas del juego Pókemon TCG de las últimas expansiones.',
      path: '/cartas-nuevas' 
    },
    { 
      id: 2, 
      image: 'https://media.discordapp.net/attachments/1449463615391531199/1450101152984072314/Peluches.png?ex=69414f70&is=693ffdf0&hm=1b42ad71beeed2d17c6da37f6a840af6bdf5b3ed31ace4f24c57f049c581983b&=&format=webp&quality=lossless', 
      title: 'Peluches', 
      description: 'Peluches originales y exclusivos en distintos tamaños y diseños.',
      path: '/productos' 
    },
    { 
      id: 3, 
      image: 'https://media.discordapp.net/attachments/1449463615391531199/1450101150698307766/Accesorios.png?ex=69414f6f&is=693ffdef&hm=b8791a3b9c4c5e712a87086c60831dda3b508652447edb3ad2e6313dc94d006e&=&format=webp&quality=lossless', 
      title: 'Accesorios', 
      description: 'Accesorios de Pókemon. Desde protectores de cartas hasta items de la franquicia.',
      path: '/accesorios' 
    },
    { 
      id: 4, 
      image: 'https://media.discordapp.net/attachments/1449463615391531199/1450101152115982386/Expansiones.png?ex=69414f70&is=693ffdf0&hm=421bdbe36b5ea1451cbd701f17ba62f6d65a8684110a64cad8bdbb410e924bdd&=&format=webp&quality=lossless', 
      title: 'Paquetes', 
      description: 'Sobres, cajas y paquetes de cartas coleccionables.',
      path: '/paquetes'
    }
  ];

  const handleCategoryClick = (path) => {
    if (path) {
      navigate(path);
      window.scrollTo(0, 0); 
    }
  };

  const products = [
    {
      id: 101,
      name: 'Pókemon TCG White Flare booster',
      description: 'Paquete de cartas de la colección scarlet & violet. Las cartas están en inglés y son aleatorias',
      price: '$29.990',
      imageUrl: 'https://cdnx.jumpseller.com/juegos-gori/image/63336092/resize/610/610?1746828969'
    },
    {
      id: 102,
      name: 'Peluche de Cubone',
      description: 'Peluche de cubone. Un producto suave y detallado.',
      price: '$42.000',
      imageUrl: 'https://images.stockx.com/images/Pokemon-Center-Sleeping-Cubone-Poke-Plush.jpg?fit=fill&bg=FFFFFF&w=480&h=320&q=60&dpr=1&trim=color&updated_at=1690911380'
    },
    {
      id: 103,
      name: 'Paquete de figuras ',
      description: 'Figuras pequeñas de edición coleccionista.',
      price: '$12.000',
      imageUrl: 'https://i5.walmartimages.com/seo/Pokemon-8-Pack-Six-2-inch-Two-3-inch-Battle-Ready-Figures-including-Pikachu-Bulbasaur-Squirtle-Charmander-Jigglypuff-Meowth-Haunter-Psyduck_031dbde6-2707-4494-b53d-99a2211bb296.c8511edf1b53c299c7cdbf70ac091b05.jpeg'
    },
    {
      id: 104,
      name: 'Paquete de cartas Prismatic evolutions',
      description: 'Paquete de cartas temático que incluye sobres y bolsita temática.',
      price: '$45.000',
      imageUrl: 'https://dojiw2m9tvv09.cloudfront.net/68889/product/M_caja-bolsa-con-eevee-ingles6443.png?188&time=1765489359'
    }
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Bienvenido a PokeStore</h1>
          <p className="hero-subtitle">Tu tienda de confianza para cartas y accesorios Pokémon</p>
        </div>
        <div className="hero-pokeball"></div>
      </section>

      <section className="categories-section">
        <h2 className="section-title">Nuevos Productos</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="category-card" 
              onClick={() => handleCategoryClick(cat.path)} 
              style={{ cursor: 'pointer' }} 
            >
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
          {products.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;