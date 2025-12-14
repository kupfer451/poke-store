const CART_KEY = 'shopping_cart';

export const cartService = {
  // Obtener el carrito actual
  getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  },

  // Guardar el carrito
  saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  },

  // Agregar producto al carrito
  addToCart(product, quantity = 1) {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex >= 0) {
      // Si ya existe, aumentar cantidad
      cart[existingIndex].quantity += quantity;
    } else {
      // Si no existe, agregar nuevo item
      cart.push({
        id: product.id,
        product_name: product.product_name,
        price: product.price,
        image_url: product.image_url,
        quantity: quantity,
      });
    }

    this.saveCart(cart);
    // Disparar evento para actualizar componentes
    window.dispatchEvent(new Event('cartUpdated'));
    return cart;
  },

  // Actualizar cantidad de un producto
  updateQuantity(productId, quantity) {
    const cart = this.getCart();
    const index = cart.findIndex(item => item.id === productId);

    if (index >= 0) {
      if (quantity <= 0) {
        cart.splice(index, 1);
      } else {
        cart[index].quantity = quantity;
      }
      this.saveCart(cart);
      window.dispatchEvent(new Event('cartUpdated'));
    }

    return cart;
  },

  // Eliminar producto del carrito
  removeFromCart(productId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.id !== productId);
    this.saveCart(cart);
    window.dispatchEvent(new Event('cartUpdated'));
    return cart;
  },

  // Limpiar todo el carrito
  clearCart() {
    localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new Event('cartUpdated'));
    return [];
  },

  // Obtener cantidad total de items
  getItemCount() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  // Calcular subtotal
  getSubtotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  // Preparar items para enviar al API de órdenes
  prepareOrderItems() {
    const cart = this.getCart();
    return cart.map(item => ({
      product_id: item.id,
      quantity: item.quantity,
    }));
  },
};

export default cartService;
