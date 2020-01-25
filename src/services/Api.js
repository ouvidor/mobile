import axios from 'axios';
import { getJWT } from '../helpers';

export const baseURL = 'http://10.0.10.168:3003';

const configs = {
  baseURL,
};

/**
 * @author Lucas Sousa
 * @since 2020.01.22
 * @description
 * Este método verifica se temos um JWT armazenado no dispositivo.
 * Se tivermos, retorno uma conexão onde já enviamos o JWT como Authorization Token.
 * Se não tivermos, retorno uma conexão com as configurações padrões
 */
export const getSecureRequest = async () => {
  const jwt = await getJWT();

  if (jwt) {
    configs.headers = {
      ...configs.headers,
      Authorization: `Bearer ${jwt}`,
    };
  }

  return axios.create(configs);
};

/**
 * @param {string} url
 * @param {object} data
 * @author Lucas Sousa
 * @since 2020.01.23
 * @description
 * Este método realiza um POST request para URL, passando DATA.
 * Retorno a resposta do request.
 */
export const getPostRequest = async (url, data) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${baseURL}${url}`,
      data,
    });
    return response;
  } catch (e) {
    return e.response;
  }
};

/**
 * @param {string} url
 * @param {object} data
 * @author Lucas Sousa
 * @since 2020.01.23
 * @description
 * Este método realiza um GET request para URL, passando PARAMS.
 * Retorno a resposta do request.
 */
export const getRequest = async (url, params) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${baseURL}${url}`,
      params,
    });
    return response;
  } catch (e) {
    return e.response;
  }
};
