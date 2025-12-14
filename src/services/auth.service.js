const API_BASE_URL = 'http://localhost:8080/api/auth';

export const authService = {
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al iniciar sesión');
    }
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user || data));
    }

    return data;
  },


  async register(userData) {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userData.username,
        password: userData.password,
        email: userData.email,
        rut: userData.rut,
        isAdmin: false,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al registrar usuario');
    }

    return data;
  },


  async checkEmail(email) {
    const response = await fetch(`${API_BASE_URL}/check-email/${encodeURIComponent(email)}`);
    
    if (!response.ok) {
      throw new Error('Error al verificar el email');
    }

    return response.json();
  },


  async checkRut(rut) {
    const response = await fetch(`${API_BASE_URL}/check-rut/${encodeURIComponent(rut)}`);
    
    if (!response.ok) {
      throw new Error('Error al verificar el RUT');
    }

    return response.json();
  },


  async validateToken(token) {
    const response = await fetch(`${API_BASE_URL}/validate-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error('Token inválido');
    }

    return response.json();
  },


  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getToken() {
    return localStorage.getItem('authToken');
  },


  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },


  isAuthenticated() {
    return !!this.getToken();
  },
};

export default authService;
