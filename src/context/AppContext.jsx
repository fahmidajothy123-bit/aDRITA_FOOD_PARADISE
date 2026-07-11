import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);

  // On mount: restore cart/wishlist from localStorage and, if a token
  // exists, restore the logged-in session + orders from the backend.
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('afp_cart');
      const savedWishlist = localStorage.getItem('afp_wishlist');
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) { /* ignore */ }

    const token = localStorage.getItem('afp_token');
    if (token) {
      api.me()
        .then((data) => {
          setUser(data.user);
          return api.getMyOrders();
        })
        .then((o) => setOrders(o))
        .catch(() => {
          localStorage.removeItem('afp_token');
          setUser(null);
        })
        .finally(() => setAuthLoading(false));
    } else {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('afp_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('afp_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // ---- Cart (client-side) ----
  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(c => c.id === item.id);
      if (exists) {
        return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(c => c.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) { removeFromCart(id); return; }
    setCart(prev => prev.map(c => c.id === id ? { ...c, qty } : c));
  };

  const clearCart = () => setCart([]);

  // ---- Wishlist (client-side) ----
  const toggleWishlist = (item) => {
    setWishlist(prev => {
      const exists = prev.find(w => w.id === item.id);
      if (exists) return prev.filter(w => w.id !== item.id);
      return [...prev, item];
    });
  };

  const isInWishlist = (id) => wishlist.some(w => w.id === id);
  const isInCart = (id) => cart.some(c => c.id === id);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // ---- Auth (backend) ----
  const refreshOrders = async () => {
    try {
      const o = await api.getMyOrders();
      setOrders(o);
    } catch (e) { /* ignore */ }
  };

  const login = async ({ email, password }) => {
    const data = await api.login({ email, password });
    localStorage.setItem('afp_token', data.token);
    setUser(data.user);
    await refreshOrders();
    return data.user;
  };

  const register = async ({ name, email, phone, password }) => {
    const data = await api.register({ name, email, phone, password });
    localStorage.setItem('afp_token', data.token);
    setUser(data.user);
    await refreshOrders();
    return data.user;
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
    localStorage.removeItem('afp_token');
  };

  // ---- Orders (backend) ----
  const placeOrder = async (orderData) => {
    const payload = {
      items: cart.map(c => ({ name: c.name, qty: c.qty, price: c.price })),
      subtotal: orderData.subtotal,
      deliveryFee: orderData.deliveryFee,
      vat: orderData.vat,
      discount: orderData.discount,
      total: orderData.total,
      deliveryInfo: orderData.deliveryInfo,
      paymentMethod: orderData.paymentMethod,
      promoCode: orderData.promoCode,
    };
    const order = await api.createOrder(payload);
    setOrders(prev => [order, ...prev]);
    clearCart();
    return order.id;
  };

  return (
    <AppContext.Provider value={{
      cart, wishlist, user, orders, authLoading,
      addToCart, removeFromCart, updateQty, clearCart,
      toggleWishlist, isInWishlist, isInCart,
      cartTotal, cartCount,
      login, register, logout,
      placeOrder, refreshOrders,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
