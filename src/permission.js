 import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
 //路由拦截 用来做一些进入页面的限制，比如没有登录，就不能进入某些页面 钩子函数？
 /**
  * to: 路由将要跳转的路径信息
  * from: 路径跳转前的路径信息
  * next: 路由的控制参数
  *   next() 跳入下一个页面
  *   next('/path') 改变路由跳转方向，使其跳转到另一个路由
  *   next(false) 返回原来的页面
  *   next((vm)=>{}) 仅在beforeRuteEnter中可用，vm是组件实例
  */
 router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') { // 如果是登陆 放行
      next({ path: '/' })//重要 往下走 否则就卡住了
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          let menus=res.data.menus; //后台传过来的菜单
          //console.log(menus);
          let username=res.data.username;//获取用户名
          store.dispatch('GenerateRoutes', { menus,username }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
            next({ ...to, replace: true })
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
