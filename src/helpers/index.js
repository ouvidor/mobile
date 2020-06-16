/* eslint-disable no-useless-escape */
import Api from '../services/Api';

/**
 * @param {string} email
 * @author Lucas Sousa
 * @since 2020.01.23
 * @description
 * Método para validar um email.
 */
export const validarEmail = email => {
  return !!String(email).match(
    /^[0-9a-zA-Z][0-9a-zA-Z_.-]+@[0-9a-zA-Z][0-9a-zA-Z_.-]+\.[a-zA-Z]{2,}$/
  );
};

/**
 * @author Lucas Sousa
 * @since 2020.01.27
 * @description
 * Busca e retorna todas as categorias existentes para manifestações
 */
export const getCategories = async () => {
  try {
    const categories = await Api.get('/category');
    return categories;
  } catch (e) {
    return e;
  }
};

/**
 * @author Lucas Sousa
 * @since 2020.01.27
 * @description
 * Busca e retorna todas os tipos existentes para manifestações
 */
export const getTypes = async () => {
  try {
    const types = await Api.get('/type');
    return types;
  } catch (e) {
    return e;
  }
};

/**
 * @author Lucas Sousa
 * @since 2020.01.31
 * @description
 * Itera por um objeto eliminando keys que tenham false como seu valor.
 */
export const clearEmptyKeys = obj => {
  const newObj = {};
  Object.keys(obj).map(key => {
    if (obj[key]) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};
