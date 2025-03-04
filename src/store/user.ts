import { defineStore } from 'pinia'
import { ref } from 'vue'
import Cookies from 'js-cookie'
import router from '../router'

// 导入API和TOKEN_KEY
import { loginApi, getUserInfoApi } from '../api/user'
import { TOKEN_KEY } from '../utils/request'

// 导入类型
import type { UserInfo } from '../types/api'

// 用户存储
export const useUserStore = defineStore(
  'user', 
  () => {
    // 状态
    const token = ref<string>(Cookies.get(TOKEN_KEY) || '')
    const userInfo = ref<UserInfo | null>(null)

    // 设置token
    function setToken(value: string) {
      token.value = value
      // 设置token到cookie，有效期7天
      Cookies.set(TOKEN_KEY, value, { expires: 7 })
    }

    // 移除token
    function removeToken() {
      token.value = ''
      userInfo.value = null
      Cookies.remove(TOKEN_KEY)
    }

    // 登录
    async function login(username: string, password: string): Promise<boolean> {
      try {
        const response = await loginApi(username, password)
        if (response.code === 0 && response.data && response.data.token) {
          setToken(response.data.token)
          // 登录成功后获取用户信息
          await getUserInfo()
          return true
        }
        return false
      } catch (error) {
        console.error('登录失败:', error)
        return false
      }
    }

    // 获取用户信息
    async function getUserInfo() {
      try {
        if (!token.value) return null
        
        const response = await getUserInfoApi()
        if (response.code === 0 && response.data) {
          userInfo.value = response.data
          return response.data
        }
        return null
      } catch (error) {
        console.error('获取用户信息失败:', error)
        removeToken() // 获取用户信息失败，清除token
        router.push('/login')
        return null
      }
    }

    // 登出
    function logout() {
      removeToken()
      router.push('/login')
    }

    // 重置状态
    function resetState() {
      token.value = ''
      userInfo.value = null
    }

    return {
      token,
      userInfo,
      login,
      logout,
      getUserInfo,
      resetState,
      setToken,
      removeToken
    }
  },
  {
    // 持久化配置
    persist: true
  }
) 