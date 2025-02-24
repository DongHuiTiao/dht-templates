import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'

import 'virtual:uno.css'

// 先初始化数据，再创建应用
async function main() {
  const app = createApp(App)

  app.use(ElementPlus, {
    locale: zhCn,
  })
  app.use(router).mount('#app')
}

main()