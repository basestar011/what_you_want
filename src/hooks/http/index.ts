import { Method } from '@/types/enums';
import { httpRequest } from '@/utils/http'
import { useAuthStore } from '@/store/auth'
import type { AxiosRequestHeaders, AxiosResponse } from 'axios'

/**
 * 권한이 필요없는 Get 요청
 * @param {string} url 요청 url
 * @param {AxiosRequestHeaders} headers 요청 헤더
 * @return {Promise<AxiosResponse<R>>} response
 */
export const useGet = <R extends Object>(url: string, headers: AxiosRequestHeaders = {}): Promise<AxiosResponse<R>> => {
  return httpRequest<any, R>(url, Method.GET, { headers });
}

/**
 * 권한이 필요없는 Post 요청
 * @param {string} url 요청 url
 * @param {D} data 요청 body data
 * @param {AxiosRequestHeaders} headers 요청 헤더
 * @return {Promise<AxiosResponse<R, D>>} response
 */
export const usePost = <D extends Object, R extends Object>(url: string, data?: D, headers: AxiosRequestHeaders = {}): Promise<AxiosResponse<R, D>> => {
  return httpRequest<D, R>(url, Method.POST, { headers }, data);
}

/**
 * 권한이 필요없는 Patch 요청
 * @param {string} url 요청 url
 * @param {D} data 요청 body data
 * @param {AxiosRequestHeaders} headers 요청 헤더
 * @return {Promise<AxiosResponse<R, D>>} response
 */
export const usePatch = <D extends Object, R extends Object>(url: string, data?: D, headers: AxiosRequestHeaders = {}): Promise<AxiosResponse<R, D>> => {
  return httpRequest<D, R>(url, Method.PATCH, { headers }, data);
}

/**
 * 권한이 필요없는 Delete 요청
 * @param {string} url 요청 url
 * @param {AxiosRequestHeaders} headers 요청 헤더
 * @return {Promise<AxiosResponse<R>>} response
 */
export const useDelete = <R extends Object>(url: string, headers: AxiosRequestHeaders = {}): Promise<AxiosResponse<R>> => {
  return httpRequest<any, R>(url, Method.DELETE, { headers });
}

/**
 * 권한이 필요한 Get 요청
 * - header에 기본 Authorization 세팅
 * @param {string} url 요청 url
 * @param {AxiosRequestHeaders} headers 요청 헤더
 * @return {Promise<AxiosResponse<R>>} response
 */
export const useAuthGet = <R extends Object>(url: string, headers: AxiosRequestHeaders = {}): Promise<AxiosResponse<R>> => {
  return httpRequest<any, R>(url, Method.GET, { headers: {
    ...headers,
    'Authorization': useAuthStore().bearerToken
  } });
}

/**
 * 권한이 필요한 Post 요청
 * - header에 기본 Authorization 세팅
 * @param {string} url 요청 url
 * @param {D} data 요청 body data
 * @param {AxiosRequestHeaders} headers 요청 헤더
 * @return {Promise<AxiosResponse<R, D>>} response
 */
export const useAuthPost = <D extends Object, R extends Object>(url: string, data?: D, headers: AxiosRequestHeaders = {}): Promise<AxiosResponse<R, D>> => {
  return httpRequest<D, R>(url, Method.POST, { headers: {
    ...headers,
    'Authorization': useAuthStore().bearerToken
  } }, data);
}

/**
 * 권한이 필요한 Patch 요청
 * - header에 기본 Authorization 세팅
 * @param {string} url 요청 url
 * @param {D} data 요청 body data
 * @param {AxiosRequestHeaders} headers 요청 헤더
 * @return {Promise<AxiosResponse<R, D>>} response
 */
export const useAuthPatch = <D extends Object, R extends Object>(url: string, data?: D, headers: AxiosRequestHeaders = {}): Promise<AxiosResponse<R, D>> => {
  return httpRequest<D, R>(url, Method.PATCH, { headers: {
    ...headers,
    'Authorization': useAuthStore().bearerToken
  } }, data);
}

/**
 * 권한이 필요한 Delete 요청
 * - header에 기본 Authorization 세팅
 * @param {string} url 요청 url
 * @param {AxiosRequestHeaders} headers 요청 헤더
 * @return {Promise<AxiosResponse<R>>} response
 */
export const useAuthDelete = <R extends Object>(url: string, headers: AxiosRequestHeaders = {}): Promise<AxiosResponse<R>> => {
  return httpRequest<any, R>(url, Method.DELETE, { headers: {
    ...headers,
    'Authorization': useAuthStore().bearerToken
  } });
}