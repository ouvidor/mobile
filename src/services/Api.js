import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

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
  const jwt = await AsyncStorage.getitem('jwt');

  if (jwt) {
    configs.headers = {
      ...configs.headers,
      Authorization: `Bearer ${jwt}`,
    };
  }

  return axios.create(configs);
};

export const getPostRequest = async (url, data) => {
  return axios({
    method: 'post',
    url: `${baseURL}${url}`,
    data,
  });
};
