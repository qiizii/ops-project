import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 导入自动引入插件
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
// 导入Ant Design Vue的解析器
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'


export default defineConfig({
  plugins: [
    vue(),
    // 自动引入组件配置
    Components({
      // 组件类型声明文件生成位置
      dts: 'src/types/components.d.ts',
      // 需要自动导入的组件目录
      dirs: ['src/components'],
      // 组件名称包含目录，防止同名组件冲突
      directoryAsNamespace: true,
      // 解析器
      resolvers: [
        // Ant Design Vue 组件自动引入解析器
        AntDesignVueResolver({
          importStyle: false, // 不导入样式，因为已经全局引入了
          resolveIcons: true, // 自动导入图标
        }),
      ],
    }),
    // 自动引入 API 配置
    AutoImport({
      // 自动导入的API类型声明文件生成位置
      dts: 'src/types/auto-imports.d.ts',
      // 需要自动导入的API
      imports: [
        'vue',  // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        'vue-router', // 自动导入 Vue Router 相关函数，如：useRoute, useRouter 等
        {
          // 手动添加Ant Design Vue的API
          'ant-design-vue': [
            'message',
            'notification',
            'Modal'
          ]
        }
      ],
      // 生成全局声明
      eslintrc: {
        enabled: true, // 启用 ESLint 支持
        filepath: './.eslintrc-auto-import.json', // ESLint 规则文件路径
        globalsPropValue: true,
      },
    }),
  ],
  // 配置模块解析选项
  resolve: {
    // 设置路径别名
    alias: {
      // 将 @ 符号映射到 src 目录的绝对路径
      '@': path.resolve(__dirname, './src')
    }
  },
  // CSS 相关配置
  css: {
    // 预处理器配置选项
    preprocessorOptions: {
      // SCSS 配置
      scss: {
        // 在每个 scss 文件的开头自动注入以下内容
        additionalData: `
          @use "@/styles/variables.scss" as v; 
          @use "@/styles/mixins.scss" as m;
        `
      }
    }
  }
})
