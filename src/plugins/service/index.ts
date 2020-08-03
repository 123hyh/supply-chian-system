/*
 * @Author: your name
 * @Date: 2020-08-02 23:44:01
 * @lastTime: 2020-08-03 18:51:14
 * @LastAuthor: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \supply-chain-system\src\plugins\service\index.ts
 */

type anyObj = { [prop: string]: string };
type RequestParams = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  headers?: anyObj;
};

/**
 * @namespace
 *
 * @property {string} baseUrl   - url前缀
 * @property {function} before - 请求拦截器
 * @property {function} after - 响应拦截器
 * @property {object} initHeaders - 初始化请求头
 *
 */

type InitFetchParams = {
  baseUrl?: string;
  before?: () => void;
  after?: () => void;
  initHeaders?: anyObj
};

export function useFetch ( baseParams: InitFetchParams ) {

  /* 初始化请求头, 默认 json */
  let baseHeaders: anyObj = { 
    ...(
      baseParams.initHeaders ?? { 'content-type': 'application/json' } 
    )
  };

  return {
    fetch: ( requestParams: RequestParams ) => {
      
      const { 
        url = '',
        method, data,
        headers = {} 
      } = requestParams;

      return fetch( 
        baseParams.baseUrl + url,
        {
          body: data,

          /* 请求头 */
          headers: { ...baseHeaders, ...headers },
          method,

          /* 不缓存 */
          cache: 'no-cache',

          /* 默认同源cookie */
          credentials: 'same-origin'
        } 
      );
    },

    /**
     * 设置请求头
     * @description:
     * @param {type}
     * @return:
     */
    setHeaders ( headers: anyObj ) {
      baseHeaders = { ...baseHeaders, ...headers };
    },

    /**
     * 获取所有请求头
     * @description:
     * @param {type}
     * @return:
     */
    getHeaders () {
      return { ...baseHeaders };
    }
  };
}
