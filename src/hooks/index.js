import { http } from '../utils/http'
import { useAuthStore } from '../store/auth'

/**
 * 
 * @param {'GET'|'POST'|'PATCH'|'DELETE'} method Request Method
 * @param {string} url Request Url
 * @param {Object} data Request Body data
 * @param {Object} config Request Header Config
 */
export const useClient = (method, url, data, config) => {
  

}

/**
 * 
 * @param {'GET'|'POST'|'PATCH'|'DELETE'} method Request Method
 * @param {string} url Request Url
 * @param {Object} data Request Body data
 * @param {Object} config Request Header Config
 */
export const useAuthClient = (method, url, data, config) => {
  const result = http.interceptors.request.use((config) => {
    const token = useAuthStore().getBearerToken;
    console.log('token', token);
    config.headers['Authorization'] = token;
    return config;
  }, (error) => {
    console.log(error);
  })

  const result2 = http.interceptors.response.use((response) => {
    console.log(response);
    return response;
  }, (error) => console.log(error))

  console.log('result', result, result2);

  return http;
}