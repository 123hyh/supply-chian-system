/*
 * @Author: your name
 * @Date: 2020-08-02 23:44:01
 * @lastTime: 2020-08-03 19:24:21
 * @LastAuthor: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \supply-chain-system\src\plugins\service\index.ts
 */

type anyObj = { [prop: string]: any };
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
  before?: <T>( requestConf: T ) => T;
  after?: ( response: anyObj ) => any;
  initHeaders?: anyObj;
};

interface customerRequest extends RequestInit {
  url: string;
  data:
    | string
    | Blob
    | ArrayBufferView
    | ArrayBuffer
    | FormData
    | URLSearchParams
    | ReadableStream<Uint8Array>
    | null
    | undefined;
}

export function useFetch ( baseParams: InitFetchParams ) {

  /* 初始化请求头, 默认 json */
  let baseHeaders: anyObj = {
    ...( baseParams.initHeaders ?? { 'content-type': 'application/json' } )
  };

  return {

    /**
     * 请求方法
     * @property {string} requestParams.url 请求路径
     * @property {string} requestParams.method 请求方法
     * @property {any} requestParams.data 请求方法
     * @property {object} requestParams.headers 请求头集合
     */
    fetch: async ( requestParams: RequestParams ) => {
      
      let customer: customerRequest;

      {
        const { url = '', method, data, headers = {} } = requestParams;

        customer = {
          url: baseParams.baseUrl + url,
          data,
          method,
          headers: { ...baseHeaders, ...headers },
          cache: 'no-cache',
          credentials: 'same-origin'
        };

        /* 请求拦截器 */
        if ( baseParams.before ) {
          customer = baseParams.before( customer );
        }
      }
      
      try {
        const { url, data, method, headers, cache, credentials } = customer;

        let response = await  fetch( url, {
          body: data,
  
          /* 请求头 */
          headers,
          method,
  
          /* 不缓存 */
          cache,
  
          /* 默认同源cookie */
          credentials
        } );
        if ( baseParams.after && typeof baseParams.after === 'function' ) {
          response = baseParams.after( response );
        }
        return response;
        
      } catch ( error ) {
        return Promise.reject( error );
      }
      
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
