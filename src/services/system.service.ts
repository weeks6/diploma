import { User } from '../types/validation/UserSchema';
import { API_ENDPOINT } from './constants';
const checkSystem = async () => {
  try {
    const response = await fetch(`${API_ENDPOINT}/system`);

    if (response.status === 200) {
      return await response.json();
    } else if (response.status === 418) {
      return false;
    }
  } catch (error) {
    console.log(error);
    return true;
  }
};

const setupSystem = async (formData: User) => {
  return fetch(`${API_ENDPOINT}/system`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });
};

export { checkSystem, setupSystem };
