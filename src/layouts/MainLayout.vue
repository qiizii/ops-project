<template>
  <div class="d-flex w-100 h-100">
    <!-- 左侧菜单 -->
    <div class="bg-dark sidebar">
      <div class="sider-logo d-flex justify-content-center align-items-center">
        <div class="logo-icon">
          <span class="icon-placeholder"></span>
        </div>
        <h1 class="m-0 text-base">数智化运维平台</h1>
      </div>
      <a-menu
        mode="inline"
        theme="dark"
        v-model:selectedKeys="selectedKeys"
        :defaultOpenKeys="openKeys"
        @click="handleMenuClick"
        class="w-100"
      >
        <a-menu-item key="dashboard">
          <template #icon><dashboard-outlined /></template>
          <span>首页</span>
        </a-menu-item>
        <a-menu-item key="about">
          <template #icon><info-circle-outlined /></template>
          <span>关于系统</span>
        </a-menu-item>
        <!-- 后续会通过API动态生成菜单 -->
      </a-menu>
    </div>

    <!-- 右侧内容区 -->
    <div class="d-flex flex-column w-100 main-content">
      <!-- 顶部导航栏 -->
      <div
        class="top-nav d-flex justify-content-between align-items-center pb-2 pt-2 pl-3 pr-3"
      >
        <div class="flex-1">
          <a-breadcrumb>
            <a-breadcrumb-item
              v-for="(item, index) in breadcrumbs"
              :key="index"
            >
              {{ item.title }}
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div class="d-flex align-items-center ml-3">
          <a-dropdown>
            <a
              class="d-flex align-items-center"
              @click.prevent
            >
              <a-avatar :size="32">{{
                userInfo.name?.[0]?.toUpperCase() || "U"
              }}</a-avatar>
              <span class="username">{{
                userInfo.name || "用户"
              }}</span>
              <down-outlined />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item key="profile">
                  <user-outlined />
                  个人信息
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="logout" @click="handleLogout">
                  <logout-outlined />
                  退出登录
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>

      <!-- 标签导航 -->
      <div class="tags-nav">
        <div class="tags-container">
          <a-tag
            v-for="tag in visitedTags"
            :key="tag.path"
            :color="isActive(tag) ? '#108ee9' : undefined"
            :closable="!tag.meta.affix"
            @close="closeTag(tag)"
            @click="clickTag(tag)"
            class="nav-tag"
          >
            {{ tag.meta.title }}
          </a-tag>
        </div>
        <div class="ml-3">
          <a-dropdown>
            <a class="tag-setting" @click.prevent>
              <setting-outlined />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item key="closeOthers" @click="closeOtherTags">
                  关闭其他
                </a-menu-item>
                <a-menu-item key="closeAll" @click="closeAllTags">
                  关闭所有
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>

      <!-- 主内容区 -->
      <div class="p-3 main-container">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <keep-alive :include="cachedViews">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 用户信息
const userStore = useUserStore();
const userInfo = computed(() => {
  return {
    name: userStore.userInfo?.name || "用户",
    avatar: userStore.userInfo?.avatar,
    roles: userStore.userInfo?.roles || [],
  };
});

// 路由相关
const router = useRouter();
const route = useRoute();
const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);

// 面包屑导航
const breadcrumbs = computed(() => {
  const result = [];
  if (route.name) {
    // 首页永远是第一个
    result.push({
      title: "首页",
      path: "/dashboard",
    });

    // 当前路由
    if (route.meta.title && route.path !== "/dashboard") {
      result.push({
        title: route.meta.title,
        path: route.path,
      });
    }
  }
  return result;
});

// 添加类型定义
interface TagView {
  path: string;
  name: string;
  meta: {
    title: string;
    affix?: boolean;
  };
}

// 标签导航
const visitedTags = ref<TagView[]>([
  // 默认添加首页，且不可关闭
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: {
      title: "首页",
      affix: true, // affix为true表示不可关闭
    },
  },
]);

const cachedViews = computed(() => {
  return visitedTags.value.map((tag) => tag.name);
});

// 判断标签是否处于激活状态
const isActive = (tag: TagView) => {
  return tag.path === route.path;
};

// 监听路由变化，更新标签导航
watch(
  () => route.path,
  () => {
    if (route.name) {
      // 更新选中的菜单项
      const routeName = route.name.toString();
      // 根据路由名称设置菜单选中项
      if (routeName === "Dashboard") {
        selectedKeys.value = ["dashboard"];
      } else if (routeName === "About") {
        selectedKeys.value = ["about"];
      } else {
        // 其他路由直接使用路由名作为key（小写处理）
        selectedKeys.value = [routeName.toLowerCase()];
      }

      // 添加访问的标签
      if (!visitedTags.value.some((v) => v.path === route.path)) {
        addVisitedTag(route);
      }
    }
  },
  { immediate: true }
);

// 点击标签
const clickTag = (tag: TagView) => {
  router.push(tag.path);
};

// 添加访问的标签
const addVisitedTag = (view: any) => {
  if (visitedTags.value.some((v) => v.path === view.path)) return;

  // 确保view.meta存在
  if (view.meta) {
    visitedTags.value.push({
      path: view.path,
      name: view.name as string,
      meta: {
        title: view.meta.title || "unknown",
        affix: view.meta.affix || false,
      },
    });
  }
};

// 关闭标签
const closeTag = (view: TagView) => {
  // 找到要关闭的标签的索引
  const index = visitedTags.value.findIndex((v) => v.path === view.path);
  if (index === -1) return;

  // 从数组中移除
  visitedTags.value.splice(index, 1);

  // 如果关闭的是当前标签，则需要跳转到其他标签
  if (isActive(view)) {
    toLastTag();
  }
};

// 关闭其他标签
const closeOtherTags = () => {
  // 过滤出不可关闭的标签和当前标签
  visitedTags.value = visitedTags.value.filter((tag) => {
    return tag.meta.affix || tag.path === route.path;
  });
};

// 关闭所有标签
const closeAllTags = () => {
  // 只保留不可关闭的标签
  visitedTags.value = visitedTags.value.filter((tag) => tag.meta.affix);
  toLastTag();
};

// 跳转到最后一个标签
const toLastTag = () => {
  const latestTag = visitedTags.value.slice(-1)[0];
  if (latestTag) {
    router.push(latestTag.path);
  } else {
    // 如果没有标签了，跳转到首页
    router.push("/");
  }
};

// 菜单点击事件 - 修复类型问题
const handleMenuClick = (info: any) => {
  // 获取菜单key
  const key = info.key as string;

  // 根据key跳转到相应路由
  if (key === "dashboard") {
    router.push("/dashboard");
  } else if (key === "about") {
    router.push("/about");
  }
  // 后续可以根据动态菜单来处理其他路由
};

// 退出登录
const handleLogout = () => {
  Modal.confirm({
    title: "确认退出",
    content: "您确定要退出登录吗？",
    okText: "确认",
    cancelText: "取消",
    onOk: async () => {
      try {
        await userStore.logout();
        message.success("已退出登录");
        router.push("/login");
      } catch (error) {
        message.error("退出登录失败");
        console.error("退出登录错误:", error);
      }
    },
  });
};

// 初始化
onMounted(() => {
  // 默认激活首页菜单
  selectedKeys.value = ["dashboard"];

  // 获取用户信息
  if (!userStore.userInfo) {
    userStore.getUserInfo();
  }
});
</script>

<style lang="scss" scoped>
.sider-logo {
  height: 64px;
}

.top-nav {
  height: 55px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 21, 41, 0.08);
  z-index: 10;
  position: relative;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// 侧边栏样式
.sidebar {
  width: 240px;
  overflow-y: auto;
  z-index: 20;
  box-shadow: 2px 0 8px rgba(0, 21, 41, 0.05);
}

// 主内容区样式
.main-content {
  overflow: hidden;
  background-color: #f5f7fa;
  
  .username {
    margin: 0 8px;
    color: rgba(0, 0, 0, 0.85);
  }
  
  // 标签导航
  .tags-nav {
    height: 40px;
    background-color: #f9fafc;
    border-bottom: 1px solid #eaedf1;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.03);
    position: relative;
    z-index: 5;
    
    .tags-container {
      flex: 1;
      overflow-x: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
      display: flex;
      align-items: center;
      padding: 4px 0;
      
      &::-webkit-scrollbar {
        display: none;
      }
      
      .nav-tag {
        margin-right: 8px;
        cursor: pointer;
        user-select: none;
        transition: all 0.3s;
        position: relative;
        z-index: 2;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          z-index: 3;
        }
      }
    }
    
    .tag-setting {
      cursor: pointer;
      font-size: 16px;
      color: #666;
      position: relative;
      z-index: 2;
      
      &:hover {
        color: #1890ff;
      }
    }
  }
  
  // 主内容容器
  .main-container {
    flex: 1;
    overflow-y: auto;
    background-color: #fff;
    box-shadow: 0 1px 6px rgba(0, 21, 41, 0.04);
    border-radius: 4px;
    margin: 12px;
    padding: 16px !important;
  }
}

// 深层样式选择器，用于覆盖Ant Design菜单组件的样式
.bg-dark {
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
      mask: url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3e%3cpath d="M12 4L3 9.25L3 14.75L12 20L21 14.75L21 9.25L12 4Z"/%3e%3c/svg%3e')
        no-repeat center;
      -webkit-mask: url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3e%3cpath d="M12 4L3 9.25L3 14.75L12 20L21 14.75L21 9.25L12 4Z"/%3e%3c/svg%3e')
        no-repeat center;
    }
  }
  :deep(.ant-menu) {
    background-color: transparent !important;

    .ant-menu-item {
      color: white !important;

      .anticon {
        color: white !important;
      }
    }

    .ant-menu-item-selected,
    .ant-menu-item-active {
      color: #fff !important;
      background-color: #1890ff !important;

      .anticon {
        color: #fff !important;
      }
    }
  }
}
</style>
