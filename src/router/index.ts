import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Cookies from 'js-cookie'
import { TOKEN_KEY } from '../utils/request'

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: '登录',
      requiresAuth: false
    }
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('../layouts/MainLayout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: {
          title: '首页',
          requiresAuth: true,
          affix: true
        }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/About.vue'),
        meta: {
          title: '关于系统',
          requiresAuth: true
        }
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    // 404页面
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '404',
      requiresAuth: false
    }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - 运维平台`
  }
  
  // 打印当前路由信息，帮助调试

  // 判断该路由是否需要登录权限
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 获取token，从Cookie或localStorage中获取
    const tokenFromCookie = Cookies.get(TOKEN_KEY)
    const userStoreData = localStorage.getItem('user-store')
    const tokenFromStorage = userStoreData ? JSON.parse(userStoreData).token : ''
    
    const token = tokenFromCookie || tokenFromStorage
    
    if (!token) {
      // 未登录，跳转到登录页面
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 将当前路由信息传递给登录页面，以便登录成功后返回
      })
    } else {
      next() // 已登录，正常访问
    }
  } else {
    // 不需要登录权限的路由，直接访问
    console.log('不需要权限的路由，允许访问')
    next()
  }
})

export default router
