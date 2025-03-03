import { createApp } from 'vue'
// 替换原有CSS引入
// import './style.css'
import App from './App.vue'
import router from './router'

// 引入Ant Design Vue
import Antd from 'ant-design-vue'

// 创建应用实例
const app = createApp(App)

// 注册插件
app.use(Antd)
app.use(router)

// 导入全局样式 (放在插件注册后，确保样式能覆盖组件库样式)
import './styles/index.scss'

// 挂载应用
app.mount('#app')
