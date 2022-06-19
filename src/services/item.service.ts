import { getAccessToken, UserResponse } from './auth.service';
import { API_ENDPOINT } from './constants';

export type Room = {
  id: number;
  title: string;
};

export type ItemType = {
  id: number;
  title: string;
};

export type TMovementHistoryItem = {
  id: number;
  createdAt: string;
  itemId: number;
  roomId: number;
  room: Room;
};

export type TInventoryItem = {
  id: number;
  createdAt: string;
  images: any[];
  movementHistory: TMovementHistoryItem[];
  properties: string;
  title: string;
  guid: string;
  type: ItemType;
  typeId: number;
  user: UserResponse;
  userId: number;
  roomId: number;
  room: Room;
};

export type TInventoryFilters = {
  room?: string;
  type?: string;
};

export const itemTypesList = async (): Promise<ItemType[]> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/inventory/itemTypes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getAccessToken()}`
      }
    });

    if (response.status >= 400) {
      throw response;
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const createItemType = async (formData: { title: string }) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/inventory/itemTypes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify(formData)
    });

    if (response.status >= 400) {
      throw response;
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteItemType = async (id: number) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/inventory/itemTypes`, {
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

export const editItemType = async (id: number, title: string) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/inventory/itemTypes`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify({ id, title })
    });

    if (response.status >= 400) {
      throw response;
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const itemList = async (filters: TInventoryFilters = {}) => {
  try {
    let url = `${API_ENDPOINT}/inventory/items`;

    if (filters.room) {
      if (url.indexOf('?') < 0) {
        url += '?';
      }

      url += `room=${filters.room}`;
    }

    if (filters.type) {
      if (url.indexOf('?') < 0) {
        url += '?';
      } else {
        url += '&';
      }

      url += `type=${filters.type}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getAccessToken()}`
      }
    });

    if (response.status >= 400) {
      throw response;
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const createItem = async (formData: {
  title: string;
  type: string;
  room: string;
  guid: string;
  photos: any[];
  properties: any[];
}) => {
  try {
    const body = new FormData();

    formData.photos.forEach((file, index) => {
      body.append(`photos`, file);
    });

    body.append('title', formData.title);
    body.append('type', formData.type);
    body.append('guid', formData.guid);
    body.append('properties', JSON.stringify(formData.properties));

    if (formData.room) {
      body.append('room', formData.room);
    }

    const response = await fetch(`${API_ENDPOINT}/inventory/items`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${getAccessToken()}`
      },
      body
    });

    if (response.status >= 400) {
      throw response;
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const editItem = async (formData: {
  id: number;
  title: string;
  type: string;
  room: string;
  guid: string;
  photos: any[];
  properties: any[];
}) => {
  try {
    const body = new FormData();
    body.append('id', `${formData.id}`);
    formData.photos.forEach((file, index) => {
      if (file instanceof File) {
        body.append(`photos`, file);
      } else {
        body.append(`photos_old[]`, file.id);
      }
    });

    body.append('title', formData.title);
    body.append('type', formData.type);

    if (formData.room) {
      body.append('room', formData.room);
    }

    body.append('guid', formData.guid);
    body.append('properties', JSON.stringify(formData.properties));

    const response = await fetch(`${API_ENDPOINT}/inventory/items`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${getAccessToken()}`
      },
      body
    });

    if (response.status >= 400) {
      throw response;
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteItem = async (id: number) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/inventory/items`, {
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

export const getItem = async (formData: { id: number }) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/inventory/items`, {
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
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const roomList = async (): Promise<ItemType[]> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/room`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getAccessToken()}`
      }
    });

    if (response.status >= 400) {
      throw response;
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const createRoom = async (formData: { title: string }) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/room`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify(formData)
    });

    if (response.status >= 400) {
      throw response;
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteRoom = async (id: number) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/room`, {
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

export const editRoom = async (id: number, title: string) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/room`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify({ id, title })
    });

    if (response.status >= 400) {
      throw response;
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};
