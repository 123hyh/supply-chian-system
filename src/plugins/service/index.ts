/*
 * @Author: your name
 * @Date: 2020-08-02 23:44:01
 * @LastEditTime: 2020-08-03 00:01:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /supply-chian-system/src/plugins/service/index.ts
 */

type RequestParams = {
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: any,
}

/**
 * @namespace
 * 
 * @property {string} baseUrl   -url前缀
 * @property {function} before 请求拦截器
 * @property {function} after 响应拦截器
 * 
 */
type InitFetchParams = {
  baseUrl?: string,
  before?: () => void,
  after?: () => void
}
export function useFetch (
  baseParams: InitFetchParams
) {
  return ( requestParams: RequestParams ) => {
    const { url, method, data } = requestParams;
    return fetch( url );
  };
}