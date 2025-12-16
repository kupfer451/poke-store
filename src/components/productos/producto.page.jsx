import React, { useEffect, useState } from 'react';
import ProductCard from '../product-card/product-card.page.jsx';
import productsService from '../../services/products.service';
import './producto.styles.css';

const CATEGORIES = [
  'Todas',
  'Peluches',
  'Cartas',
  'Figuras',
  'Accesorios',
];

const ProductoPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('Todas');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, category, search]);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await productsService.getAll();
      setProducts(data);
    } catch (err) {
      setError('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let result = products;
    if (category !== 'Todas') {
      result = result.filter(p => (p.category || '').toLowerCase() === category.toLowerCase());
    }
    if (search.trim()) {
      result = result.filter(p =>
        (p.product_name || p.name || '').toLowerCase().includes(search.trim().toLowerCase())
      );
    }
    setFiltered(result);
  };

  return (
    <div className="products-section">
      <h1 className="section-title">Productos</h1>

      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{ padding: 8, borderRadius: 8 }}
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: 8, borderRadius: 8, flex: 1, minWidth: 200 }}
        />
      </div>

      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}>Cargando productos...</div>
      ) : (
        <div className="products-grid">
          {filtered.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#888' }}>
              No se encontraron productos.
            </div>
          ) : (
            filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductoPage;