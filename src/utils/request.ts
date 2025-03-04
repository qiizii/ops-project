import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

// Token键名，保持统一
export const TOKEN_KEY = 'ops_token'

// 创建axios实例
const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get(TOKEN_KEY)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 直接返回响应数据
    return response.data
  },
  (error: any) => {
    // 可以在这里统一处理错误，例如根据状态码显示不同的错误信息
    // 如果是401，可以清除token并跳转到登录页
    return Promise.reject(error)
  }
)

export default request 