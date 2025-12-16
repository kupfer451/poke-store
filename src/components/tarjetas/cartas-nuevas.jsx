import React from 'react';
import ProductCard from '../product-card/product-card.page.jsx'; 
import '../home/home.styles.css'; 

const CartasNuevasPage = () => {

  const newCards = [
    {
      id: 101,
      name: 'Dawn',
      description: 'Carta de entrenadora Pokémon. Si buscas fortalecer tu mazo o agregar una pieza especial a tu colección.',
      price: '$4.200',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/003/466/529/products/080f7bf17fbdc0fa59d479964c4467f6feaac98dba563a2e3d7282c1da7166a8-7049ca89e5c0b01b1917630908487313-1024-1024.webp'
    },
    {
      id: 102,
      name: 'Yamper',
      description: 'Pokémon perrito tipo Rayo. Carta holográfica.',
      price: '$5.990',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/003/466/529/products/a954d85652c4043cf774a73d460925362db55340632d2bbca2c39b763d3b1479-09c86e0398c8d21c5217630927061056-1024-1024.webp'
    },
    {
      id: 103,
      name: 'Piplup',
      description: 'Pokémon tipo Agua. Edición coleccionista.',
      price: '$18.000',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/003/466/529/products/a7a52205d4c899dbee8f3520893b0aae266afa4eb7c21c2cffef2a9cc65a880f-437059b9a45474d87817630926127859-1024-1024.webp'
    },
    {
      id: 104,
      name: 'Eevee Promo',
      description: 'Carta holográfica de Eevee.',
      price: '$5.000',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/003/466/529/products/1819934-c81bde8693b883389717425767999681-1024-1024.webp'
    },
    {
      id: 105,
      name: 'Garchomp V',
      description: 'Carta de Garchomp y su entrenadora Cynthia. Full Art.',
      price: '$48.000',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/003/466/529/products/swsh10_en_tg231-6517aab540c1a912c116898124412229-1024-1024.webp'
    },
     {
      id: 106,
      name: 'Zacian EX',
      description: 'Carta Edición coleccionista.',
      price: '$3.700',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/003/466/529/products/632678_in_1000x1000-728c8c2ec0dba2984417567419185209-1024-1024.jpg'
    },
    {
      id: 107,
      name: 'Terapagos EX',
      description: 'Carta holográfica de Terapagos. Edición Full art.',
      price: '$33.000',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/003/466/529/products/sv07_en_170-36ad6856d4b52b842717307652762468-1024-1024.webp'
    },
    {
      id: 108,
      name: 'Cinderance EX',
      description: 'Carta holográfica de Cinderance. Edición Full art.',
      price: '$5.500',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/003/466/529/products/596420_in_1000x1000-becb9dd5c586dfd6eb17380219012644-1024-1024.webp'
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