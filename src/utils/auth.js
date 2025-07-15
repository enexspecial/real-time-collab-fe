import jwtDecode from 'jwt-decode';

export function setToken(token) {
  localStorage.setItem('accessToken', token);
}

export function getToken() {
  return localStorage.getItem('accessToken');
}

export function removeToken() {
  localStorage.removeItem('accessToken');
}

export function getUserFromToken() {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
} 