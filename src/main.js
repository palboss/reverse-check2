import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createI18n } from 'vue-i18n'
import './index.css'

// 路由配置
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./views/Home.vue')
    }
  ]
})

// i18n配置
const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  messages: {
    'zh-CN': {
      message: {
        title: '模型逆向与否检测',
        startCheck: '开始检测',
        modelProvider: '模型提供商',
        testParams: '检测参数',
        apiBaseUrl: 'API Base URL',
        apiKey: 'API Key',
        model: '待检测模型',
        reverseExample: '逆向接口返回示例',
        officialExample: '官方接口返回示例',
        requestResult: '请求结果'
      }
    }
  }
})

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')