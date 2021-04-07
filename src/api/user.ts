/**
 * 所有跟用户相关的接口
 */

import { HttpRequest, HttpResponse } from '@/@types/api';
import { UserStateType } from '@/models/user';
import Axios from './axios';

/**
 * @interface loginParams -登录参数
 * @property {string} grant_type -授权类型
 * @property {string} email -邮箱
 * @property {string} password -用户密码
 */
export interface LoginParams {
  username: string;
  password: string;
}

/**
 * @example Axios.get(`https://xxx.com}`)
 * @todo Get the exchange rate of the current currency
 */

class UserService {
  // 登录
  static async login(
    params: LoginParams,
  ): Promise<HttpResponse<UserStateType>> {
    return Axios('/user/login', {
      method: 'post',
      responseType: 'json',
      data: params,
    });
  }

  // 获取用户的历史提交记录
  static async submitHistory(params: HttpRequest) {
    return Axios({
      url: '/wechat/test/history',
      method: 'post',
      responseType: 'json',
      data: {
        ...params,
      },
    });
  }
}

export default UserService;
