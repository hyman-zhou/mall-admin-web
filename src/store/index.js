import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'

//1.导入VueX
Vue.use(Vuex)

//2.创建store对象
const store = new Vuex.Store({
  //state中存放的就是需要被全局共享的数据
  modules: {
    app,
    user,
    permission
  },
  getters
})
//3.将store对象挂载到vue实例中
export default store
