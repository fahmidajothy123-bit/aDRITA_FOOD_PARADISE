// Central API helper for talking to the Express backend.
// Base URL comes from Vite env (VITE_API_URL) and falls back to localhost.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('afp_token');

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong. Please try again.');
  }
  return data;
}

export const api = {
  // Auth
  register: (payload) => request('/auth/register', { method: 'POST', body: payload }),
  login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
  me: () => request('/auth/me', { auth: true }),

  // Menu
  getMenu: () => request('/menu'),

  // Orders
  createOrder: (payload) => request('/orders', { method: 'POST', body: payload, auth: true }),
  getMyOrders: () => request('/orders', { auth: true }),

  // Reservations
  createReservation: (payload) => request('/reservations', { method: 'POST', body: payload }),
};

export default api;
