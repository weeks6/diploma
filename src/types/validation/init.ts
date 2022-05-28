import { setLocale } from 'yup';

export const initLocale = () => {
  console.log('inited locale');

  setLocale({
    string: {
      email: 'Поле должно содержать правильный Email',
      min: ({ min }) => `Строка должна быть не короче ${min} символов`
    },
    array: {
      min: ({ min }) => `Минимум ${min} элементов`
    },
    mixed: {
      default: 'Неверное значение',
      required: 'Это поле обязательно'
    }
  });
};
