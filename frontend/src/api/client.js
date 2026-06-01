const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001/api';

export function getToken() {
  return localStorage.getItem('wallet_token');
}

export function setToken(token) {
  localStorage.setItem('wallet_token', token);
}

export function removeToken() {
  localStorage.removeItem('wallet_token');
}

export async function apiRequest(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  let data = null;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  }

  if (!response.ok) {
    const message = data?.detail || 'Ocurrió un error en la petición';
    throw new Error(message);
  }

  return data;
}
