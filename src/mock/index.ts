import Mock from 'mockjs'

// 设置mock的响应时间
Mock.setup({
  timeout: '200-600'
})

// 引入模块
import './user'

export default Mock 