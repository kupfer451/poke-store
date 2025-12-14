import React from 'react';
import PokemonLegends from '../../assets/pokemon-legends-z-a-169-es.png';
import './nosotros.styles.css';

const NosotrosPage = () => {
  return (
    <div className="nosotros-container">
      <h1>Sobre Nosotros</h1>
      <p>Somos una nueva tienda dedicada al mundo Pokémon, creada para reunir a entrenadores de todas las edades y niveles en un mismo lugar. En nuestra tienda encontrarás cartas Pokémon y productos oficiales, cuidadosamente seleccionados para coleccionistas, jugadores competitivos y fans que recién comienzan su aventura.

Creemos que Pokémon es más que un juego: es comunidad, estrategia y diversión. Por eso, además de productos, ofrecemos clases para aprender a jugar Pokémon los días sábado, pensadas tanto para principiantes como para quienes quieren mejorar sus habilidades y conocer mejor el juego de cartas.

Nuestro objetivo es ser un espacio acogedor donde todos los fans —niños, jóvenes y adultos— puedan aprender, compartir y disfrutar del universo Pokémon.

  Horario de atención:
Lunes a sábado, de 12:00 a 21:00 hrs

¡Te esperamos para comenzar juntos esta nueva aventura Pokémon!</p>
      
      <div className="nosotros-image">
        <img src={PokemonLegends} alt="Pokémon Legends" />
      </div>
    </div>
  );
};

export default NosotrosPage;
