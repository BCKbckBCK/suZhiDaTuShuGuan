import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index'  //首页
import Login from '@/components/Login'  //登录页
import Admin from '@/components/Admin'  //后台页面

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: '首页',component: Index},
    {path: '/index',name: '首页',component: Index},
    {path: '/login',name: '登录页面',component: Login},
    {
      path: '/admin',meta:{requireAuth:true},name: '管理界面',component: Admin,
      children:[
        {path: '/',meta:{requireAuth:true},name: '管理员列表',component: ()=>import('@/components/admin/user')},
        {path: '/aboutLibrary',meta:{requireAuth:true},name: '本馆风采',component: ()=>import('@/components/admin/aboutLibrary')},
        {path: '/readerStar',meta:{requireAuth:true},name: '阅读之星',component: ()=>import('@/components/admin/readerStar')},
        {path: '/todayRecommend',meta:{requireAuth:true},name: '今日推荐',component: ()=>import('@/components/admin/todayRecommend')},
        {path: '/borrowingList',meta:{requireAuth:true},name: '图书借阅排行',component: ()=>import('@/components/admin/borrowingList')},
        {path: '/notice',meta:{requireAuth:true},name: '通知公告',component: ()=>import('@/components/admin/notice')},
        {path: '/libraryPeopleCount',meta:{requireAuth:true},name: '到馆人数统计',component: ()=>import('@/components/admin/libraryPeopleCount')},
        {path: '/borrowingCount',meta:{requireAuth:true},name: '借阅量数据',component: ()=>import('@/components/admin/borrowingCount')},
        {path: '/role',meta:{requireAuth:true},name: '角色权限',component: ()=>import('@/components/admin/role')},
        {path: '/operationLog',meta:{requireAuth:true},name: '操作日志',component: ()=>import('@/components/admin/operationLog')},
        {path: '/systemAccessLog',meta:{requireAuth:true},name: '系统访问日志',component: ()=>import('@/components/admin/systemAccessLog')}
        
      ]
    },
    

    
  ]
})
