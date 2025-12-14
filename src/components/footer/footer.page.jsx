import { Link } from 'react-router-dom';
import './footer.styles.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-brand">PokeStore</h3>
          <p className="footer-description">
            Tu tienda de confianza para cartas y artículos Pokémon. 
            Colecciona, intercambia y disfruta.
          </p>
        </div>

        <div className="footer-section">
          <h4>Enlaces</h4>
          <ul className="footer-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="producto">Productos</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Categorías</h4>
          <ul className="footer-links">
            <li><Link to="/coleccion">Colección</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contacto</h4>
          <ul className="footer-contact">
            <li>info@pokestore.com</li>
            <li>+569 55543432</li>
            <li>Ciudad Pokémon, CP 12345</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 PokeStore. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
