// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

// 判断是否登录，未登录跳转到登录页
router.beforeEach((to, from, next) => {
  const type = to.meta.requireAuth;
  // 判断该路由是否需要登录权限
  if (type == true) {
    // console.log(sessionStorage.getItem('adminInfo'));
    if (sessionStorage.getItem('adminInfo')) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()  // 确保一定要有next()被调用
  }
})

//引入全局样式表
import '@/assets/css/global.css'

//引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
  
Vue.use(VueQuillEditor)

//下载第三方组件库 element-ui     npm i element -S
//引入element组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//将element-ui注册vue实例
Vue.use(ElementUI);

//引入qs模块处理请求参数
import qs from 'qs'
//将qs添加进vue的原型中
Vue.prototype.qs=qs

//引入chart
import echarts from 'echarts'
//将echarts引入到vue的原型中
Vue.prototype.$echarts=echarts


//下载axios模块   npm i axios -S
//引入axios模块
import axios from "axios"
//配置服务器基础路径
 //axios.defaults.baseURL = "http://localhost:3000/"
axios.defaults.baseURL = "http://47.101.204.69:3000/" ;
//配置保存session信息
axios.defaults.withCredentials = true
//axios 注册vue
Vue.prototype.axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({ 
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
