// Base URL of the Express backend.
// In development this points to your local backend server.
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Small helper wrapper around fetch so every API call
// handles JSON + errors the same way.
export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('afp_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong. Please try again.');
  }

  return data;
}