import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets
/**
 * 引入element ui
 */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'//导入路由配置文件 自动扫描router目录下的路由配置
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { locale }) //使用element ui
Vue.use(VCharts)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router, //挂载路由
  store,//将store挂载到vue实例中，所有的组件，就可以直接从store中获取全局的数据了
  template: '<App/>',
  components: { App }
})
