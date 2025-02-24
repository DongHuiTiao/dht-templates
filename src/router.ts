import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: () => import('./views/Home/index.vue'),
    },
  ],
})

// 白名单路径（不需要登录的页面）
const whiteList = ['/login', '/register']

// 添加路由守卫
router.beforeEach(async (to, _from, next) => {
  // 如果再白名单内
  if (whiteList.includes(to.path)) {
    next()
    return
  }

  // 这里是路由首位的逻辑

  next()
})

export default router
