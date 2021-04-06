import Axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import { message } from 'antd';

export function throwMessage<T = any>(responsePromise: Promise<T>) {
  return responsePromise.catch((e: Error) => {
    console.error(`error`, e);
  });
}

// 处理无权限访问的拦截参数

/**
 * get status code
 * @param {AxiosResponse} response Axios  response object
 */
const getErrorCode2text = (response: AxiosResponse): string => {
  /** http status code */
  const code = response.status;
  /** notice text */
  let message = '请求错误';
  switch (code) {
    case 400:
      message = '客户端发生错误';
      break;
    case 401:
      message = '登录已经过期';
      break;
    case 403:
      message = '拒绝访问';
      break;
    case 404:
      message = '访问资源不存在';
      break;
    case 408:
      message = '请求超时';
      break;
    case 500:
      message = '位置错误';
      break;
    case 501:
      message = '承载服务未实现';
      break;
    case 502:
      message = '网关错误';
      break;
    case 503:
      message = '服务暂不可用';
      break;
    case 504:
      message = '网关超时';
      break;
    case 505:
      message = '暂不支持的 HTTP 版本';
      break;
    default:
      message = '位置错误';
  }
  return message;
};

/**
 * @returns  {AxiosResponse} result
 * @tutorial see more:https://github.com/onlyling/some-demo/tree/master/typescript-width-axios
 * @example
 * service.get<{data: string; code: number}>('/test').then(({data}) => { console.log(data.code) })
 */
const service = Axios.create({
  baseURL: ENV_CONFIG.baseUrl,
  timeout: 10000,
  headers: {
    'User-Type': 'bus',
  },
});

/**
 * @description 请求发起前的拦截器
 * @returns {AxiosRequestConfig} config
 */
service.interceptors.request.use(async (config: AxiosRequestConfig) => {
  // 不需要token的接口，直接返回
  return config;
});

/**
 * @description 响应收到后的拦截器
 * @returns {}
 */
service.interceptors.response.use(
  /** 请求有响应 */
  async (response: AxiosResponse) => {
    if (response?.status === 200) {
      if (response.data?.data?.resultCode === 1) {
        message.warn(response?.data?.data.resultMessage); // 统一处理业务错误
      }
      return Promise.resolve(response);
    } else {
      const __text = getErrorCode2text(response);
      return throwMessage<any>(Promise.reject(__text));
    }
  },
  /** 请求无响应,统一处理接口错误 */
  (error: AxiosError) => {
    let __emsg: string = error.message || '';

    if (error.message) {
      __emsg = error.message;
    }

    if (error.response) {
      __emsg = error.response.data.message
        ? error.response.data.message
        : error.response.data.data;
    }
    // timeout
    if (__emsg.indexOf('timeout') >= 0) {
      __emsg = '请求已经超时，请稍后再试！';
    }

    /* if (error?.response?.status === 401) {
      if (!store.state.console.expired) {
        message.info('登录凭证已过期，请重新登录！');
      }
      history.push('/entry/login');
      // 更新登录过期标识
      // setStoreState('console', 'expired', true);
      return throwMessage(Promise.reject(__emsg));
    } */

    /**
     * 处理消息提示重复的问题
     * 403 - 没有系统权限
     * 400 - 项目信息未查到，及当前用户没有项目权限
     * NOTE: 这里其实和具体业务没有关系，只是处理同时请求多次接口错误引起多次弹出错误提示
     */
    // 处理消息提示重复的问题

    message.error(__emsg);
    return throwMessage(Promise.reject(__emsg));
  },
);

export default service;
