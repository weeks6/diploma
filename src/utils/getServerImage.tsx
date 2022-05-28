import { API_ENDPOINT } from '../services/constants';

export const getServerImage = (src: string) => `${API_ENDPOINT}${src}`;
