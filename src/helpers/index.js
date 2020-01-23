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
