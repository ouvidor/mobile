/* eslint-disable no-useless-escape */
import AsyncStorage from '@react-native-community/async-storage';
import Api from '../services/Api';

/**
 * @param {string} email
 * @param {string} password
 * @author Lucas Sousa
 * @description
 * Realiza Login. Faz um POST request passando as credenciais para /auth.
 * Em caso de login bem sucedido, armazeno o user/JWT no dispositivo.
 * Retorno a resposta do request.
 */
export const SignIn = async (email, password) => {
  try {
    const response = await Api.post('/auth', {
      email,
      password,
    });
    if ('token' in response) {
      AsyncStorage.setItem('user', JSON.stringify(response));
    }
    return response;
  } catch (e) {
    return e;
  }
};

/**
 * @author Lucas Sousa
 * @since 2020.01.25
 * @description
 * Desloga um usuário, por deslogar, significa que simplesmente
 * limpamos o JWT do armazenamento do dispositivo.
 */
export const SignOut = async () => {
  await AsyncStorage.removeItem('user');
  return true;
};

/**
 * @author Lucas Sousa
 * @since 2020.01.23
 * @description
 * Busco e retorno o JWT, caso este exista.
 */
export const getJWT = async () => {
  let user = await AsyncStorage.getItem('user');
  if (user) {
    user = JSON.parse(user);
    return user.token;
  }
  return false;
};

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
