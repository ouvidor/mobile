/* eslint-disable no-useless-escape */
import AsyncStorage from '@react-native-community/async-storage';
import { getPostRequest } from '../services/Api';

/**
 * @param {string} email
 * @param {string} password
 * @author Lucas Sousa
 * @description
 * Realiza Login. Faz um POST request passando as credenciais para /auth.
 * Em caso de login bem sucedido, armazeno o user/JWT no dispositivo.
 * Retorno a resposta do request.
 */
export const Logar = async (email, password) => {
  try {
    const response = await getPostRequest('/auth', {
      email,
      password,
    });

    if ('token' in response.data) {
      AsyncStorage.setItem('user', JSON.stringify(response.data));
    }

    return response;
  } catch (e) {
    return e;
  }
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
