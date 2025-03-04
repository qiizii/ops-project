/**
 * API 响应类型定义
 */

// 通用响应结构
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

// 登录接口返回数据
export interface LoginData {
  token: string;
}

// 用户信息
export interface UserInfo {
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  roles?: string[];
} 