<template>
  <div class="login-container">
    <div class="login-background">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>
    
    <a-card class="login-card">
      <div class="login-header">
        <div class="logo-container">
          <div class="logo-icon">
            <span class="icon-placeholder"></span>
          </div>
          <h1 class="font-medium">运维平台</h1>
        </div>
        <p class="welcome-text">欢迎使用运维管理系统</p>
      </div>
      
      <a-form
        :model="formState"
        :rules="rules"
        ref="formRef"
        class="login-form"
        @finish="handleFinish"
      >
        <a-form-item name="username">
          <a-input
            v-model:value="formState.username"
            placeholder="请输入用户名"
            size="large"
            :maxLength="20"
            autocomplete="username"
          >
            <template #prefix><user-outlined /></template>
          </a-input>
        </a-form-item>
        
        <a-form-item name="password">
          <a-input-password
            v-model:value="formState.password"
            placeholder="请输入密码"
            size="large"
            :maxLength="20"
            autocomplete="current-password"
          >
            <template #prefix><lock-outlined /></template>
          </a-input-password>
        </a-form-item>
        
        <!-- <div class="login-options">
          <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
          <a class="forgot-link">忘记密码?</a>
        </div> -->
        
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            class="login-button"
            size="large"
            :loading="loading"
            block
          >
            登 录
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const formRef = ref()
const userStore = useUserStore()
const loading = ref(false)

// 表单状态
const formState = reactive({
  username: 'admin', // 默认填写admin方便测试
  password: 'admin', // 默认填写admin方便测试
  remember: true
})

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, message: '用户名长度不能少于3个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 4, message: '密码长度不能少于4个字符', trigger: 'blur' }
  ]
}

// 提交表单
const handleFinish = async (values: any) => {
  try {
    loading.value = true
    const result = await userStore.login(values.username, values.password)
    
    if (result) {
      message.success('登录成功')
      
      // 如果有重定向参数，则跳转到相应页面
      const redirectPath = route.query.redirect as string
      
      // 使用 push 而不是 replace 进行跳转
      router.push(redirectPath || '/dashboard')
    } else {
      message.error('登录失败，请检查用户名和密码')
    }
  } catch (error) {
    message.error('登录过程发生错误')
    console.error('登录错误:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #2a4b8d, #3a6cce);
}

.login-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  animation: float 10s infinite ease-in-out;
  
  &-1 {
    top: -150px;
    left: -100px;
    width: 500px;
    height: 500px;
    animation-delay: 0s;
  }
  
  &-2 {
    bottom: -200px;
    right: -100px;
    width: 600px;
    height: 600px;
    animation-delay: 2s;
  }
  
  &-3 {
    top: 50%;
    left: 60%;
    width: 300px;
    height: 300px;
    animation-delay: 4s;
  }
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
}

.login-card {
  position: relative;
  z-index: 1;
  width: 420px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  animation: fadeIn 0.8s ease-out;
  padding: 20px;
  
  :deep(.ant-card-body) {
    padding: 20px;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-header {
  margin-bottom: 24px;
  text-align: center;
  
  .logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
    
    .logo-icon {
      margin-right: 12px;
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: linear-gradient(135deg, #3a6cce, #2a4b8d);
      display: flex;
      justify-content: center;
      align-items: center;
      
      .icon-placeholder {
        display: block;
        width: 20px;
        height: 20px;
        background-color: white;
        mask: url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3e%3cpath d="M12 4L3 9.25L3 14.75L12 20L21 14.75L21 9.25L12 4Z"/%3e%3c/svg%3e') no-repeat center;
        -webkit-mask: url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3e%3cpath d="M12 4L3 9.25L3 14.75L12 20L21 14.75L21 9.25L12 4Z"/%3e%3c/svg%3e') no-repeat center;
      }
    }
    
    h1 {
      margin: 0;
      font-size: 24px;
      line-height: 32px;
      color: #1f2937;
      letter-spacing: 1px;
      font-weight: 600;
    }
  }
  
  .welcome-text {
    margin: 0;
    color: #374151;
    font-size: 16px;
    line-height: 24px;
  }
}

.login-form {
  animation: slideUp 0.6s 0.3s ease-out forwards;
  opacity: 0;
  transform: translateY(10px);
  
  :deep(.ant-form-item) {
    margin-bottom: 20px;
    
    .ant-input-affix-wrapper {
      border-radius: 8px;
      border: 1px solid rgba(229, 231, 235, 0.8);
      
      &:hover, &:focus {
        border-color: #3a6cce;
      }
      
      .anticon {
        color: #6b7280;
      }
    }
  }
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  
  .forgot-link {
    color: #2a4b8d;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      color: #3a6cce;
      text-decoration: underline;
    }
  }
}

.login-button {
  height: 46px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  letter-spacing: 1px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(58, 108, 206, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(58, 108, 206, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
}

// 响应式适配
@media (max-width: 768px) {
  .login-card {
    width: 90%;
    max-width: 360px;
  }
}
</style> 