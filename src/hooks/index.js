import { http } from '../utils/http'
import { useAuthStore } from '../store/auth'

/**
 * 
 * @param {string} url Request Url
 * @param {'GET'|'POST'|'PATCH'|'DELETE'} method Request Method
 * @param {Object} data Request Body data
 * @param {Object} config Request Header Config
 */
export const useClient = async (url, method, data, config) => {
  if(!method || !url) {
    console.error('Request Method and Url must not be empty!');
    return false;
  }
  
  switch (method.toUpperCase()) {
    case 'GET':
      return http.get(url, config);
    case 'POST':
      return http.post(url, data, config);
    case 'PATCH':
      return http.patch(url, data, config);
    case 'DELETE':
      return http.delete(url, config);
    default: 
      console.error('Request Method must be get, post, patch, delete!');
      return false;
  }
}

/**
 * 
 * @param {string} url Request Url
 * @param {'GET'|'POST'|'PATCH'|'DELETE'} method Request Method
 * @param {Object} data Request Body data
 * @param {Object} config Request Header Config
 */
export const useAuthClient = async (url, method, data, config) => {
  if(!method || !url) {
    console.error('Request Method and Url must not be empty!');
    return false;
  }

  const authStore = useAuthStore();
  const requestConfig = {
    ...config,
    headers: {
      'Authorization': authStore.getBearerToken
    }
  }
  
  switch (method.toUpperCase()) {
    case 'GET':
      return http.get(url, requestConfig);
    case 'POST':
      return http.post(url, data, requestConfig);
    case 'PATCH':
      return http.patch(url, data, requestConfig);
    case 'DELETE':
      return http.delete(url, requestConfig);
    default: 
      console.error('Request Method must be get, post, patch, delete!');
      return false;
  }
}