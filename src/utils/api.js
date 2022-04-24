import { http } from './http'

export default class ApiClient {
  constructor(http) {
    this.http = http;
  }

  get(url, config = {}) {
    return this.http.get(url, config)
  }

  post(url, data, config = {}) {
    return this.http.post(url, data, config)
  }

  put(url, data, config = {}) {
    return this.http.put(url, data, config)
  }

  delete(url, config = {}) {
    return this.http.delete(url, config)
  }
}

export const apiClient = new ApiClient(http);