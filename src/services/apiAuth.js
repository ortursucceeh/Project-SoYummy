import { getAccessToken, getRefreshToken, updateTokens } from '../utils/auth';

const API_URL = 'https://so-yumi.p.goit.global/api';

export async function signup({ name, email, password }) {
  const res = await fetch(`${API_URL}/users/signup`, {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('Failed to signup🔥');

  return res.json();
}

export async function login({ email, password }) {
  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('Failed to login🔥');

  return res.json();
}

export async function getCurrentUser() {
  const refreshToken = getRefreshToken();

  await fetch(`${API_URL}/users/refresh`, {
    method: 'POST',
    body: JSON.stringify({ refreshToken: refreshToken }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(data => data.json())
    .then(({ refreshToken, accessToken }) => updateTokens(accessToken, refreshToken));

  const newAccessToken = getAccessToken();

  const res = await fetch(`${API_URL}/users/current`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${newAccessToken}`,
    },
  });

  if (!res.ok) throw new Error('Failed to get current user🔥');

  return res.json();
}

export async function logout({ token }) {
  const res = await fetch(`${API_URL}/users/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (!res.ok) throw new Error('Failed to logout🔥');

  return res.json();
}
