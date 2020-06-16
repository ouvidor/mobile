import axios from 'axios';

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://192.168.0.104:3003',
    });
  }

  saveToken(token) {
    if (!token) {
      delete this.api.defaults.headers.Authorization;
    } else {
      this.api.defaults.headers.Authorization = `Bearer ${token}`;
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

  async get(url, params) {
    try {
      const req = await this.api.get(url, params);
      return req.data;
    } catch (e) {
      return e.response.data;
    }
  }

  async put(url, params) {
    try {
      const req = await this.api.put(url, params);
      return req.data;
    } catch (e) {
      return e.response.data;
    }
  }
}

export default new Api();
