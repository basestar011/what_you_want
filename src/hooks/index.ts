import { Method } from '../types/enums';
import { httpRequest } from '../utils/http'
import { useAuthStore } from '../store/auth'
import type { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'

export const useGet = <R extends Object>(url: string, headers: AxiosRequestHeaders = {}): Promise<AxiosResponse<R>> => {
  return httpRequest<any, R>(url, Method.GET, { headers });
}

export const useAuthGet = <R extends Object>(url: string, headers: AxiosRequestHeaders = {}): Promise<AxiosResponse<R>> => {
  return httpRequest<any, R>(url, Method.GET, { headers });
}

export const usePost = <D extends Object, R extends Object>(url: string, data?: D, headers: AxiosRequestHeaders = {}): Promise<AxiosResponse<R, D>> => {
  return httpRequest<D, R>(url, Method.POST, { headers }, data);
}



/**
 * Http Request
 * @param {string} url Request Url
 * @param {Method} method Request Method
 * @param {D} data Request Body data
 * @param {AxiosRequestHeaders} headers Request Header
 */
export const useClient = <D, R>(url: string, method: Method, data?: D, headers: AxiosRequestHeaders = {}): Promise<AxiosResponse<R, D>> => {
  return data ? httpRequest<D, R>(url, method, { headers }, data)
              : httpRequest<D, R>(url, method, { headers });
}

/**
 * Http Request with Authorization Token
 * @param {string} url Request Url
 * @param {Method} method Request Method
 * @param {D} data Request Body data
 * @param {AxiosRequestHeaders} headers Request Header
 */
export const useAuthClient = <D, R>(url: string, method: Method, data?: D, headers: AxiosRequestHeaders = {}): Promise<AxiosResponse<R, D>> => {
  const authStore = useAuthStore();
  const config: AxiosRequestConfig = {
    headers: {
      ...headers,
      'Authorization': authStore.bearerToken
    }
  }
  
  return data ? httpRequest<D, R>(url, method, config, data)
              : httpRequest<D, R>(url, method, config);
}