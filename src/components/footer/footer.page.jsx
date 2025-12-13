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
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Productos</a></li>
            <li><a href="#">Ofertas</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Categorías</h4>
          <ul className="footer-links">
            <li><a href="#">Cartas</a></li>
            <li><a href="#">Boosters</a></li>
            <li><a href="#">Accesorios</a></li>
            <li><a href="#">Colecciones</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contacto</h4>
          <ul className="footer-contact">
            <li>info@pokestore.com</li>
            <li>+34 123 456 789</li>
            <li>Ciudad Pokémon, CP 12345</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 PokeStore. Todos los derechos reservados.</p>
        <div className="footer-social">
          <a href="#" aria-label="Facebook">Facebook</a>
          <a href="#" aria-label="Twitter">Twitter</a>
          <a href="#" aria-label="Instagram">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
