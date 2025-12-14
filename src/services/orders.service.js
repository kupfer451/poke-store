import authService from './auth.service';

const API_BASE_URL = 'http://localhost:8080/api/orders';

export const ordersService = {
  // ==================== ENDPOINTS AUTENTICADOS ====================

  // Crear una orden (Usuario autenticado)
  async create(orderData) {
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
        shipping_address: orderData.shipping_address,
        notes: orderData.notes || '',
        items: orderData.items,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Token no proporcionado o inválido');
      }
      throw new Error(data.message || 'Error al crear la orden');
    }

    return data;
  },

  // Obtener órdenes del usuario actual
  async getMyOrders() {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('No autorizado. Inicia sesión.');
    }

    const response = await fetch(`${API_BASE_URL}/my`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Token no proporcionado o inválido');
      }
      throw new Error('Error al obtener tus órdenes');
    }

    return response.json();
  },

  // Obtener una orden por ID (dueño o admin)
  async getById(id) {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('No autorizado. Inicia sesión.');
    }

    const response = await fetch(`${API_BASE_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Token no proporcionado o inválido');
      }
      if (response.status === 403) {
        throw new Error('No tienes permiso para ver esta orden');
      }
      if (response.status === 404) {
        throw new Error('Orden no encontrada');
      }
      throw new Error('Error al obtener la orden');
    }

    return response.json();
  },

  // Cancelar una orden (dueño si pending/paid, o admin)
  async cancel(id) {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('No autorizado. Inicia sesión.');
    }

    const response = await fetch(`${API_BASE_URL}/${id}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      if (response.status === 401) {
        throw new Error('Token no proporcionado o inválido');
      }
      if (response.status === 403) {
        throw new Error('No tienes permiso para cancelar esta orden');
      }
      throw new Error(data.message || 'Error al cancelar la orden');
    }

    return response.json();
  },

  // ==================== ENDPOINTS DE ADMIN ====================

  // Obtener todas las órdenes (Admin)
  async getAll() {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('No autorizado. Inicia sesión.');
    }

    const response = await fetch(API_BASE_URL, {
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
      throw new Error('Error al obtener las órdenes');
    }

    return response.json();
  },

  // Cambiar estado de una orden (Admin)
  async updateStatus(id, status) {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('No autorizado. Inicia sesión.');
    }

    const response = await fetch(`${API_BASE_URL}/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      if (response.status === 401) {
        throw new Error('Token no proporcionado o inválido');
      }
      if (response.status === 403) {
        throw new Error('No tienes permisos de administrador');
      }
      throw new Error(data.message || 'Error al actualizar el estado');
    }

    return response.json();
  },

  // Eliminar una orden (Admin)
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
      const data = await response.json().catch(() => ({}));
      if (response.status === 401) {
        throw new Error('Token no proporcionado o inválido');
      }
      if (response.status === 403) {
        throw new Error('No tienes permisos de administrador');
      }
      throw new Error(data.message || 'Error al eliminar la orden');
    }

    return true;
  },
};

export default ordersService;
