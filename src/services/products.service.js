import authService from './auth.service';

const API_BASE_URL = 'http://localhost:8080/api/products';

export const productsService = {
  // ==================== ENDPOINTS PÚBLICOS ====================

  // Obtener todos los productos
  async getAll() {
    const response = await fetch(API_BASE_URL);
    
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }
    
    return response.json();
  },

  // Obtener producto por ID
  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Producto no encontrado');
      }
      throw new Error('Error al obtener el producto');
    }
    
    return response.json();
  },

  // Buscar productos por nombre
  async searchByName(name) {
    const response = await fetch(`${API_BASE_URL}/search?name=${encodeURIComponent(name)}`);
    
    if (!response.ok) {
      throw new Error('Error al buscar productos');
    }
    
    return response.json();
  },

  // ==================== ENDPOINTS PROTEGIDOS (Admin) ====================

  // Crear producto (requiere token de admin)
  async create(productData) {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('No autorizado. Inicia sesión.');
    }

    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_name: productData.product_name,
        price: productData.price,
        quantity: productData.quantity,
        description: productData.description,
        category: productData.category,
        image_url: productData.image_url || null,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Token no proporcionado o inválido');
      }
      if (response.status === 403) {
        throw new Error('No tienes permisos de administrador');
      }
      throw new Error(data.message || 'Error al crear el producto');
    }

    return data;
  },

  // Actualizar producto (requiere token de admin)
  async update(id, productData) {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('No autorizado. Inicia sesión.');
    }

    // Solo enviar campos editables (excluir id y created_at)
    const { id: _id, created_at, ...editableData } = productData;
    
    const dataToSend = {
      product_name: editableData.product_name,
      price: editableData.price,
      quantity: editableData.quantity,
      description: editableData.description,
      category: editableData.category,
      image_url: editableData.image_url || null,
    };

    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Token no proporcionado o inválido');
      }
      if (response.status === 403) {
        throw new Error('No tienes permisos de administrador');
      }
      if (response.status === 404) {
        throw new Error('Producto no encontrado');
      }
      const data = await response.json();
      throw new Error(data.message || 'Error al actualizar el producto');
    }

    return response.json();
  },

  // Eliminar producto (requiere token de admin)
  async delete(id) {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('No autorizado. Inicia sesión.');
    }

    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Token no proporcionado o inválido');
      }
      if (response.status === 403) {
        throw new Error('No tienes permisos de administrador');
      }
      if (response.status === 404) {
        throw new Error('Producto no encontrado');
      }
      throw new Error('Error al eliminar el producto');
    }

    return true;
  },
};

export default productsService;
