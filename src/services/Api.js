import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { checkResponseError } from '../helpers';

class Api {
  constructor() {
    this.configs = {
      baseURL: 'http://192.168.0.104:3003',
    };

    this.api = axios.create(this.configs);
    this.setToken();
  }

  getConfigs() {
    return this.configs;
  }

  setConfigs(configs) {
    if (typeof configs !== 'object') {
      throw new Error(
        `setConfigs expects an object and instead received ${typeof configs}`
      );
    } else {
      Object.keys(configs).map(k => {
        this.configs[k] = configs[k];
      });
      return this.configs;
    }
  }

  /**
   * @author Lucas Sousa
   * @since 2020.01.25
   * @description
   * Se tivermos um JWT armazenado no dispositivo, seto nas configs
   * como Authorization: Bearer JWT
   */
  async setToken() {
    let user = await AsyncStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      this.setConfigs({
        headers: {
          ...this.configs.headers,
          Authorization: `Bearer ${user.token}`,
        },
      });
      this.api = axios.create(this.configs);
    }
  }

  async post(url, data) {
    return this.api
      .post(url, data)
      .then(response => {
        checkResponseError(response.data);
        return response.data;
      })
      .catch(e => {
        checkResponseError(e.response.data);
        return e.response.data;
      });
  }

  async get(url, params) {
    return this.api
      .get(url, params)
      .then(response => {
        checkResponseError(response.data);
        return response.data;
      })
      .catch(e => {
        checkResponseError(e.response.data);
        return e.response.data;
      });
  }

  async put(url, params) {
    return this.api
      .put(url, params)
      .then(response => {
        checkResponseError(response.data);
        return response.data;
      })
      .catch(e => {
        checkResponseError(e.response.data);
        return e.response.data;
      });
  }
}

export default new Api();
