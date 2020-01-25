import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class Api {
  constructor() {
    this.configs = {
      baseURL: 'http://10.0.10.168:3003',
    };

    this.api = axios.create(this.configs);
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
    }
  }

  async post(url, data) {
    try {
      const req = await this.api.post(url, data);
      return req.data;
    } catch (e) {
      return e.response.data;
    }
  }
}

export default new Api();
