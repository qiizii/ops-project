import { createApp } from 'vue'
// 替换原有CSS引入
// import './style.css'
import App from './App.vue'
import router from './router'

// 导入Pinia
import { createPinia } from 'pinia'
// 导入Pinia持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 引入Ant Design Vue
import Antd from 'ant-design-vue'

// 创建应用实例
const app = createApp(App)

// 创建Pinia实例
const pinia = createPinia()
// 使用持久化插件
pinia.use(piniaPluginPersistedstate)

// 注册插件
app.use(Antd)
app.use(router)
app.use(pinia)

// 导入全局样式 (放在插件注册后，确保样式能覆盖组件库样式)
import './styles/index.scss'

// 导入Mock数据（开发环境下使用）
import './mock'

// 挂载应用
app.mount('#app')
