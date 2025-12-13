import React from 'react';
import PokemonLegends from '../../assets/pokemon-legends-z-a-169-es.png';
import './nosotros.styles.css';

const NosotrosPage = () => {
  return (
    <div className="nosotros-container">
      <h1>Sobre Nosotros</h1>
      <p>Somos una tienda de venta de cartas Pokémon que busca ofrecer los mejores productos al mejor precio</p>
      <p>Nuestros productos principales son cartas para el juego de Pókemon TCG, recuerda que siempre puedes consultar acerca de nuevos productos</p>
      <p>Nuestras sucursales:
        Sucursal Centro: Av. Principal 123, Ciudad Pokémon.
        Sucursal Norte: Calle Secundaria 456, Ciudad Pokémon.
        Sucursal Sur: Blvd. Terciario 789, Ciudad Pokémon.
      </p>
      <p>Horarios:
        Lunes a Viernes: de 12:00 hrs. hasta las 22:00 hrs.
        Sábado: de 12:00 hrs. hasta las 20:00 hrs.
        Domingo y feriados: cerrado.</p>
      
      <div className="nosotros-image">
        <img src={PokemonLegends} alt="Pokémon Legends" />
      </div>
    </div>
  );
};

export default NosotrosPage;
