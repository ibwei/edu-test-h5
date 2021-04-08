/**
 * 所有跟用户相关的接口
 */

import { HttpRequest, HttpResponse } from '@/@types/api';
import { UserStateType } from '@/models/user';
import Axios from './axios';
import { QuestionItem } from '../@types/question';

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

class QuestionService {
  // 获取测试试题
  static async getTestQuestionList(): Promise<HttpResponse<QuestionItem[]>> {
    return Axios('/h5/test/list', {
      method: 'get',
      responseType: 'json',
    });
  }
}

export default QuestionService;
