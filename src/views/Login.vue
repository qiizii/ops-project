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
        
        <div class="login-options">
          <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
          <a class="forgot-link">忘记密码?</a>
        </div>
        
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
const formRef = ref()
const loading = ref(false)
console.log(router);

// 表单状态
const formState = reactive({
  username: '',
  password: '',
  remember: false
})

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, message: '用户名长度不能少于3个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6个字符', trigger: 'blur' }
  ]
}

// 提交表单
const handleFinish = (values: any) => {
  loading.value = true
  
  // 模拟登录请求
  setTimeout(() => {
    loading.value = false
    message.success('登录成功')
    router.push('/home')
  }, 1500)
}
</script>

<style lang="scss" scoped>
@use "sass:color";

.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  @include m.flex(row, center, center);
  background: linear-gradient(135deg, color.scale(v.$bg-color-dark, $lightness: 16.31%) 0%, color.scale(v.$primary-color, $lightness: 6.64%) 100%);
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
  background: rgba(255, 255, 255, 0.1);
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
  border-radius: v.$border-radius-lg;
  overflow: hidden;
  @include m.box-shadow(3);
  background-color: rgba(v.$module-color, 0.8);
  backdrop-filter: blur(10px);
  animation: fadeIn 0.8s ease-out;
  
  :deep(.ant-card-body) {
    padding: v.$spacing-xl;
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
  margin-bottom: v.$spacing-xl;
  text-align: center;
  
  .logo-container {
    @include m.flex(row, center, center);
    margin-bottom: v.$spacing-md;
    
    .logo-icon {
      margin-right: v.$spacing-sm;
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: linear-gradient(135deg, v.$primary-color, color.scale(v.$primary-color, $lightness: 19.92%));
      @include m.flex(row, center, center);
      
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
      font-size: v.$font-size-xl;
      line-height: v.$line-height-xl;
      color: color.scale(v.$primary-color, $lightness: -5%);
      letter-spacing: 1px;
    }
  }
  
  .welcome-text {
    margin: 0;
    color: v.$text-color-primary;
    font-size: v.$font-size-base;
    line-height: v.$line-height-base;
  }
}

.login-form {
  animation: slideUp 0.6s 0.3s ease-out forwards;
  opacity: 0;
  transform: translateY(10px);
  
  :deep(.ant-form-item) {
    margin-bottom: v.$spacing-lg;
    
    .ant-input-affix-wrapper {
      border-radius: v.$border-radius-base;
      border: 1px solid rgba(v.$border-color-base, 0.8);
      
      &:hover, &:focus {
        border-color: v.$primary-color;
      }
      
      .anticon {
        color: v.$text-color-tertiary;
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
  @include m.flex(row, space-between, center);
  margin-bottom: v.$spacing-md;
  
  .forgot-link {
    color: color.scale(v.$primary-color, $lightness: -20.24%);
    font-size: v.$font-size-sm;
    cursor: pointer;
    @include m.transition;
    
    &:hover {
      color: v.$primary-color;
      text-decoration: underline;
    }
  }
}

.login-button {
  height: 46px;
  font-size: v.$font-size-base;
  line-height: v.$line-height-base;
  font-weight: v.$font-weight-medium;
  letter-spacing: 1px;
  border-radius: v.$border-radius-base;
  box-shadow: 0 4px 12px rgba(v.$primary-color, 0.2);
  @include m.transition(all, 0.3s);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(v.$primary-color, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
}

// 响应式适配
@include m.respond-to(xs) {
  .login-card {
    width: 90%;
    max-width: 360px;
  }
}
</style> 