import { AuthUser, User, UserRole } from '../types/validation/UserSchema';
import { API_ENDPOINT, APP_AUTH_TOKEN } from './constants';
import { FetchResponse } from './types';

export type UserResponse = {
  email: string;
  name: string;
  role: UserRole;
  id: number;
};

export const setAccessToken = (token: string) => {
  localStorage.setItem(APP_AUTH_TOKEN, token);
};

export const removeAccessToken = () => {
  localStorage.removeItem(APP_AUTH_TOKEN);
};

export const getAccessToken = () => {
  return localStorage.getItem(APP_AUTH_TOKEN);
};

export const registerUser = async (formData: User) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify(formData)
    });

    if (response.status >= 400) {
      throw response;
    }

    return response;
  } catch (error) {
    console.log({ error });

    throw error;
  }
};

export const loginUser = (formData: AuthUser) => {
  console.log({ loginData: formData });

  return fetch(`${API_ENDPOINT}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });
};

export const fetchProfile = async (): Promise<FetchResponse<UserResponse>> => {
  const response = await fetch(`${API_ENDPOINT}/user/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${getAccessToken()}`
    }
  });

  const result: FetchResponse<UserResponse> = await response.json();

  return result;
};

export const deleteUser = async (id: number) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/user/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify({ id })
    });

    if (response.status >= 400) {
      throw response;
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const userList = async () => {
  const response = await fetch(`${API_ENDPOINT}/user/list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${getAccessToken()}`
    }
  });

  const result = await response.json();

  return result;
};

export const makeAdminUser = async (id: number) => {
  const response = await fetch(`${API_ENDPOINT}/user/makeAdmin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${getAccessToken()}`
    },
    body: JSON.stringify({ id })
  });

  const result = await response.json();

  return result;
};
