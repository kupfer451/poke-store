import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../../services/auth.service';
import productsService from '../../../services/products.service';
import './productos-admin.styles.css';

const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const DeleteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

function ProductosAdminPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    product_name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    image_url: '',
  });

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user || !user.isAdmin) {
      navigate('/');
      return;
    }
    loadProducts();
  }, [navigate]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await productsService.getAll();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      loadProducts();
      return;
    }

    try {
      const data = await productsService.searchByName(term);
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      product_name: '',
      description: '',
      price: '',
      quantity: '',
      category: '',
      image_url: '',
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.product_name || !formData.price) {
      setError('El nombre y precio son obligatorios');
      return;
    }

    if (formData.image_url && !formData.image_url.match(/^https?:\/\//)) {
      setError('La URL de la imagen debe comenzar con http:// o https://');
      return;
    }

    const productData = {
      product_name: formData.product_name,
      description: formData.description,
      price: Number(formData.price),
      quantity: Number(formData.quantity) || 0,
      category: formData.category,
      image_url: formData.image_url || null,
    };

    try {
      if (editingProduct) {
        await productsService.update(editingProduct.id, productData);
        setSuccess('Producto actualizado correctamente');
      } else {
        await productsService.create(productData);
        setSuccess('Producto creado correctamente');
      }
      resetForm();
      loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      product_name: product.product_name || '',
      description: product.description || '',
      price: product.price?.toString() || '',
      quantity: product.quantity?.toString() || '',
      category: product.category || '',
      image_url: product.image_url || '',
    });
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) {
      return;
    }

    try {
      await productsService.delete(id);
      setSuccess('Producto eliminado correctamente');
      loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price);
  };

  if (loading) {
    return <div className="productos-admin-loading">Cargando productos...</div>;
  }

  return (
    <div className="productos-admin-container">
      <div className="productos-admin-header">
        <h1>Gestión de Productos</h1>
        <button className="btn-back" onClick={() => navigate('/backoffice')}>
          ← Volver al Backoffice
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="productos-admin-actions">
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <button
          className="btn-add"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          + Agregar Producto
        </button>
      </div>

      {showForm && (
        <div className="product-form-overlay">
          <div className="product-form-container">
            <h2>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="product_name">Nombre *</label>
                  <input
                    type="text"
                    id="product_name"
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Categoría</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Peluches">Peluches</option>
                    <option value="Cartas">Cartas</option>
                    <option value="Figuras">Figuras</option>
                    <option value="Accesorios">Accesorios</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Precio (CLP) *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="quantity">Cantidad</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="image_url">URL de Imagen</label>
                <input
                  type="url"
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>

              {formData.image_url && formData.image_url.match(/^https?:\/\//) && (
                <div className="image-preview">
                  <p>Vista previa:</p>
                  <img
                    src={formData.image_url}
                    alt="Vista previa"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span className="image-error" style={{ display: 'none' }}>Error al cargar imagen</span>
                </div>
              )}

              <div className="form-buttons">
                <button type="button" className="btn-cancel" onClick={resetForm}>
                  Cancelar
                </button>
                <button type="submit" className="btn-save">
                  {editingProduct ? 'Actualizar' : 'Crear'} Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-products">
                  No hay productos disponibles
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td>
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.product_name}
                        className="product-thumbnail"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="no-image" style={{ display: product.image_url ? 'none' : 'flex' }}>Sin imagen</div>
                  </td>
                  <td>
                    <strong>{product.product_name}</strong>
                    {product.description && (
                      <p className="product-description">
                        {product.description.substring(0, 50)}
                        {product.description.length > 50 ? '...' : ''}
                      </p>
                    )}
                  </td>
                  <td>
                    <span className="category-badge">
                      {product.category || 'Sin categoría'}
                    </span>
                  </td>
                  <td className="price">{formatPrice(product.price)}</td>
                  <td>
                    <span
                      className={`stock-badge ${
                        product.quantity > 10
                          ? 'stock-high'
                          : product.quantity > 0
                          ? 'stock-low'
                          : 'stock-out'
                      }`}
                    >
                      {product.quantity}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(product)}
                      title="Editar"
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(product.id)}
                      title="Eliminar"
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductosAdminPage;
