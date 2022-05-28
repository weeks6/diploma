import { string, object, InferType, setLocale } from 'yup';
import { initLocale } from './init';

initLocale();

export const userSchema = object().shape({
  email: string().required().email(),
  name: string().required(),
  password: string().required().min(2)
});

export const authUserSchema = object().shape({
  email: string().required().email(),
  password: string().required().min(2)
});

export type AuthResponse = {
  token: string;
  message?: string;
};

export type UserRole = 'USER' | 'ADMIN';

export type AuthUser = InferType<typeof authUserSchema>;
export type User = InferType<typeof userSchema>;
