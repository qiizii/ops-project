import Mock from 'mockjs'

// 用户数据
const users = {
  admin: {
    name: '管理员',
    password: 'admin',
    phone: '11111111111',
    email: 'qzp010724@gmail.com',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    roles: ['admin']
  }
}

// 通用响应结构
const responseBody = {
  code: 0,
  data: null,
  message: ''
}

// 生成响应数据
function success(data: any) {
  return {
    ...responseBody,
    code: 0,
    data
  }
}

function error(message = '操作失败') {
  return {
    ...responseBody,
    code: 1,
    message
  }
}

// 生成随机Token
function generateToken() {
  return Mock.Random.guid() + '-' + Mock.Random.guid()
}

// 登录接口
Mock.mock(/\/api\/login/, 'post', (options: any) => {
  console.log('Mock登录')
  const { username, password } = JSON.parse(options.body)
  
  // 验证用户名密码
  if (username === 'admin' && password === 'admin') {
    return success({
      token: generateToken()
    })
  } else {
    return error('用户名或密码错误')
  }
})

// 获取用户信息接口
Mock.mock(/\/api\/user\/info/, 'get', (options: any) => {
  console.log('Mock获取用户信息')
  // 从请求头中获取token，这里简化处理，直接返回admin用户信息
  const user = users.admin
  
  if (user) {
    return success({
      name: user.name,
      phone: user.phone,
      email: user.email,
      avatar: user.avatar,
      roles: user.roles
    })
  } else {
    console.log('Mock获取用户信息失败')
    return error('获取用户信息失败')
  }
})

// 登出接口
Mock.mock(/\/api\/logout/, 'post', () => {
  return success(null)
}) 