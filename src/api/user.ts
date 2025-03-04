import request from '../utils/request'
import type { ApiResponse, LoginData, UserInfo } from '../types/api'

/**
 * 用户相关接口
 */

/**
 * 登录接口
 * @param username 用户名
 * @param password 密码
 */
export function loginApi(username: string, password: string): Promise<ApiResponse<LoginData>> {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

/**
 * 获取用户信息接口
 */
export function getUserInfoApi(): Promise<ApiResponse<UserInfo>> {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

/**
 * 登出接口
 */
export function logoutApi(): Promise<ApiResponse<null>> {
  return request({
    url: '/logout',
    method: 'post'
  })
} 