import { object, string, array } from 'yup';
import { initLocale } from './init';

initLocale();

export const itemTypeSchema = object().shape({
  title: string().required().min(2)
});

export const roomSchema = object().shape({
  title: string().required().min(2)
});

export const itemShema = object().shape({
  title: string().required().min(2),
  guid: string().required().min(2),
  photos: array().required().min(1),
  type: string().required(),
  properties: array().required().min(1)
});
