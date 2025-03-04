<template>
  <div class="dashboard-container">
    <div class="welcome-section">
      <h1>欢迎使用运维平台</h1>
      <p class="welcome-desc">运维管理系统，提供便捷的运维管理功能</p>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 16px;
}

.welcome-section {
  margin-bottom: 24px;
  
  h1 {
    font-size: 24px;
    margin-bottom: 8px;
    font-weight: 600;
    color: #1f2937;
  }
  
  .welcome-desc {
    color: #6b7280;
    font-size: 14px;
  }
}

</style> 