<script setup lang="ts">

const router = useRouter()

// 返回首页
const backHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="not-found-container">
    <div class="content-wrapper">
      <a-result
        status="404"
        title="404"
        sub-title="抱歉，您访问的页面不存在"
        class="result-box"
      >
        <template #extra>
          <a-button type="primary" @click="backHome" size="large">返回首页</a-button>
        </template>
      </a-result>
    </div>
    
    <div class="not-found-animation">
      <div class="astronaut">
        <div class="head"></div>
        <div class="body"></div>
        <div class="leg left"></div>
        <div class="leg right"></div>
        <div class="arm left"></div>
        <div class="arm right"></div>
      </div>
      <div class="planet"></div>
      <div class="stars" v-for="i in 50" :key="i"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.not-found-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #2a4b8d, #3a6cce);
  position: relative;
  overflow: hidden;
}

.content-wrapper {
  position: relative;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 90%;
  width: 500px;
  text-align: center;
  backdrop-filter: blur(10px);
}

.result-box {
  :deep(.ant-result-title) {
    color: #1f2937;
    font-size: 72px;
    font-weight: 800;
    letter-spacing: -2px;
    line-height: 1;
    margin-bottom: 12px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  :deep(.ant-result-subtitle) {
    color: #374151;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 24px;
  }

  :deep(.ant-btn) {
    height: 44px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
    padding: 0 24px;
    text-shadow: none;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.2);
  }
}

.not-found-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.astronaut {
  position: absolute;
  width: 60px;
  height: 90px;
  top: 40%;
  left: 60%;
  animation: float 10s ease-in-out infinite, rotate 15s linear infinite;
  
  .head {
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: white;
    border-radius: 50%;
    top: 0;
    left: 15px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  }
  
  .body {
    position: absolute;
    width: 40px;
    height: 50px;
    background-color: white;
    border-radius: 10px;
    top: 25px;
    left: 10px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  }
  
  .arm, .leg {
    position: absolute;
    width: 10px;
    height: 25px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  }
  
  .arm.left {
    transform: rotate(-20deg);
    top: 30px;
    left: 0;
  }
  
  .arm.right {
    transform: rotate(20deg);
    top: 30px;
    right: 0;
  }
  
  .leg.left {
    top: 70px;
    left: 10px;
  }
  
  .leg.right {
    top: 70px;
    right: 10px;
  }
}

.planet {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle at 70% 70%, #5c2e91, #4528a0);
  bottom: -100px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 60px rgba(92, 46, 145, 0.7), inset 0 0 60px rgba(255, 255, 255, 0.2);
}

.stars {
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 6px #fff;
  animation: twinkle 4s infinite;
  top: calc(var(--i, 50) * 1vh);
  left: calc(var(--j, 50) * 1vw);
  
  &:nth-child(odd) {
    --i: random(100);
    --j: random(100);
    animation-delay: calc(var(--i, 0) * 0.01s);
  }
  
  &:nth-child(even) {
    --i: random(100);
    --j: random(100);
    width: 3px;
    height: 3px;
    animation-delay: calc(var(--j, 0) * 0.01s);
  }
}

@keyframes twinkle {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// 响应式适配
@media (max-width: 768px) {
  .content-wrapper {
    width: 90%;
    padding: 15px;
  }
  
  .result-box {
    :deep(.ant-result-title) {
      font-size: 56px;
    }
    
    :deep(.ant-result-subtitle) {
      font-size: 16px;
    }
  }
}
</style> 