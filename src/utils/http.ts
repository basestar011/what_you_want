import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Method } from '../types/enums'

const http = axios.create({
  baseURL: import.meta.env.WDYW_DB_ENDPOINT,
})

const httpRequest = <D, R>(url: string, method: Method, config: AxiosRequestConfig<D> = {}, data?: D): Promise<AxiosResponse<R, D>> => {
  switch (method) {
    case Method.GET:
      return http.get<any, AxiosResponse<R, any>, any>(url, config);
    case Method.POST:
      return http.post<D, AxiosResponse<R, D>, D>(url, data, config);
    case Method.PATCH:
      return http.patch<D, AxiosResponse<R, D>, D>(url, data, config);
    case Method.DELETE:
      return http.delete<any, AxiosResponse<R, any>, any>(url, config);
  }
}

export { http, httpRequest }