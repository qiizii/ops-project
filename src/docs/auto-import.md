# Vue 自动引入功能使用说明

本项目配置了自动引入(Auto Import)功能，可以在不需要手动导入的情况下直接使用常用的API和组件。

## 已配置的自动引入内容

### Vue API 自动引入

以下 Vue 相关 API 可以直接使用，无需导入：

- `ref`, `reactive`, `computed`, `watch`, `watchEffect`
- `onMounted`, `onUnmounted`, `onUpdated` 等生命周期钩子
- `nextTick`, `toRef`, `toRefs` 等工具函数

**使用示例**：

```vue
<script setup lang="ts">
// 不需要 import { ref, reactive, computed } from 'vue'

// 直接使用
const count = ref(0)
const state = reactive({ message: 'Hello' })
const doubleCount = computed(() => count.value * 2)
</script>
```

### Vue Router API 自动引入

以下 Vue Router 相关 API 可以直接使用，无需导入：

- `useRouter`, `useRoute`
- `onBeforeRouteLeave`, `onBeforeRouteUpdate` 等路由钩子

**使用示例**：

```vue
<script setup lang="ts">
// 不需要 import { useRouter, useRoute } from 'vue-router'

// 直接使用
const router = useRouter()
const route = useRoute()

// 路由跳转
function navigateTo() {
  router.push('/home')
}
</script>
```

### Ant Design Vue 组件自动引入

Ant Design Vue 组件可以直接在模板中使用，无需注册：

- `a-button`, `a-input`, `a-form`, `a-table` 等所有 Ant Design Vue 组件
- `UserOutlined`, `LockOutlined` 等图标组件

**使用示例**：

```vue
<template>
  <!-- 不需要导入组件就可以直接使用 -->
  <a-form>
    <a-form-item>
      <a-input placeholder="用户名">
        <template #prefix>
          <user-outlined />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary">提交</a-button>
    </a-form-item>
  </a-form>
</template>
```

### Ant Design Vue API 自动引入

以下 Ant Design Vue 相关 API 可以直接使用，无需导入：

- `message` - 消息提示
- `notification` - 通知提醒框
- `Modal` - 对话框

**使用示例**：

```vue
<script setup lang="ts">
// 不需要 import { message } from 'ant-design-vue'

// 直接使用
function showSuccess() {
  message.success('操作成功')
}

function showNotification() {
  notification.info({
    message: '通知标题',
    description: '通知内容'
  })
}
</script>
```

## 自定义组件自动引入

项目中 `src/components` 目录下的组件也会自动引入，按照以下规则：

1. 组件名称自动从文件名生成
2. 嵌套目录会影响组件名称（如 `Common/Button.vue` 变成 `CommonButton`）

**使用示例**：

```vue
<template>
  <!-- 使用自定义的状态标签组件 -->
  <common-status-tag status="success" label="成功" />
</template>
```

## 注意事项

1. 自动引入的类型声明文件在 `src/types` 目录下，包括：
   - `auto-imports.d.ts` - API 自动引入的类型声明
   - `components.d.ts` - 组件自动引入的类型声明

2. 初次运行或添加新的自动引入后，可能需要重启开发服务器以生成最新的类型声明文件

3. 添加新的自定义组件后，TypeScript 会自动识别并提供类型支持

4. 如果遇到类型错误，可以尝试重启开发服务器或检查类型声明文件是否正确生成 