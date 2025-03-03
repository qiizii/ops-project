<template>
  <div class="home-container">
    <header class="header">
      <div class="logo">运维平台</div>
      <div class="user-info">
        <span>管理员</span>
        <button @click="handleLogout">退出登录</button>
      </div>
    </header>
    <div class="main-content">
      <aside class="sidebar">
        <ul class="menu">
          <li class="menu-item active">控制台</li>
          <li class="menu-item">系统管理</li>
          <li class="menu-item">用户管理</li>
          <li class="menu-item">设备管理</li>
          <li class="menu-item">日志管理</li>
        </ul>
      </aside>
      <main class="content">
        <h2 class="font-medium">欢迎使用运维平台系统</h2>
        <div class="welcome-message">
          <p>这是系统首页，可以在这里添加仪表盘、系统概览等内容。</p>
          <p class="text-tertiary">当前项目处于开发阶段，更多功能正在开发中...</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// 已配置自动引入，不再需要显式导入
// import { useRouter } from 'vue-router'

const router = useRouter()


const handleLogout = () => {
  // 这里可以添加登出逻辑
  message.info('退出登录')
  router.push('/login')
}
</script>

<style lang="scss" scoped>
@use 'sass:color';

.home-container {
  @include m.flex(column);
  height: 100vh;
}

.header {
  @include m.flex(row, space-between, center);
  padding: 0 v.$spacing-md;
  height: 60px;
  background-color: v.$primary-color;
  color: v.$nav-text-color;
}

.logo {
  font-size: v.$font-size-lg;
  line-height: v.$line-height-lg;
  font-weight: v.$font-weight-medium;
}

.user-info {
  @include m.flex(row, center, center);
  gap: v.$spacing-sm;

  button {
    background: none;
    border: 1px solid v.$nav-text-color;
    color: v.$nav-text-color;
    padding: v.$spacing-xs v.$spacing-sm;
    border-radius: v.$border-radius-base;
    cursor: pointer;
    font-size: v.$font-size-sm;
    line-height: v.$line-height-sm;
    @include m.transition;

    &:hover {
      background-color: rgba(v.$nav-text-color, 0.1);
    }
  }
}

.main-content {
  @include m.flex(row);
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 200px;
  background-color: v.$bg-color-dark;
  color: v.$nav-text-color;
  overflow-y: auto;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;

  &-item {
    padding: v.$spacing-sm v.$spacing-md;
    cursor: pointer;
    font-size: v.$font-size-base;
    line-height: v.$line-height-base;
    @include m.transition;

    &:hover {
      background-color: v.$primary-hover;
    }

    &.active {
      background-color: v.$primary-color;
      font-weight: v.$font-weight-medium;
    }
  }
}

.content {
  flex: 1;
  padding: v.$spacing-md;
  overflow-y: auto;
  background-color: v.$bg-color-base;

  h2 {
    margin-top: 0;
    color: v.$text-color-primary;
    margin-bottom: v.$spacing-md;
    font-size: v.$font-size-lg;
    line-height: v.$line-height-lg;
  }
}

.welcome-message {
  background-color: v.$module-color;
  padding: v.$spacing-md;
  border-radius: v.$border-radius-base;
  @include m.box-shadow(1);

  p {
    margin-bottom: v.$spacing-sm;
    color: v.$text-color-secondary;
    font-size: v.$font-size-base;
    line-height: v.$line-height-base;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    &.text-tertiary {
      color: v.$text-color-tertiary;
      font-size: v.$font-size-sm;
      line-height: v.$line-height-sm;
    }
  }
}
</style> 