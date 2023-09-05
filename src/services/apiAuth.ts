import { ILoginCredentials, ILoginInfo, IRegisterCredentials } from 'src/types/Auth';
import { UserType } from 'src/types/User';
import { getAccessToken, getRefreshToken, updateTokens } from '../utils/auth';
import { API_URL } from '../utils/constants';

export async function signup({ name, email, password }: IRegisterCredentials): Promise<UserType> {
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

export async function login({ email, password }: ILoginCredentials): Promise<ILoginInfo> {
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

export async function logout({ token }: { token: string }): Promise<{ message: string }> {
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

export async function refreshTokens(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  let isRefreshed;
  if (refreshToken) {
    isRefreshed = await fetch(`${API_URL}/users/refresh`, {
      method: 'POST',
      body: JSON.stringify({ refreshToken: refreshToken }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(data => data.json())
      .then(({ refreshToken, accessToken }) => {
        updateTokens(accessToken, refreshToken);
        return true;
      })
      .catch(() => false);
  }

  return !!isRefreshed;
}

export async function getCurrentUser(): Promise<UserType | null> {
  const isRefreshed = await refreshTokens();

  if (isRefreshed) {
    const res = await fetch(`${API_URL}/users/current`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    if (!res.ok) throw new Error('Failed to get current user🔥');

    return res
      .json()
      .then(data => data)
      .catch(() => null);
  }

  return null;
}

export async function updateUser(formData: FormData): Promise<UserType> {
  const res = await fetch(`${API_URL}/users/update`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error('Failed to update user😐');

  return res.json();
}
