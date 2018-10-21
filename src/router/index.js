import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Detail from '@/pages/books/zhihu/detail.vue'
import Zhihu from '@/pages/books/zhihu/'
import QQmusic from '@/pages/music/qqMusic/'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path:'/qqmusic',
          name:'qqMusic',
          component: QQmusic,
          meta: {keepAlive: false}// 不需要缓存
        },
        {
          path:'/zhihu',
          name:'Zhihu',
          component:Zhihu,
          meta: {keepAlive: true}// 需要缓存
        },
        {
          path:'/zhihu-detail',
          name:'Detail',
          component: Detail,
          meta: {keepAlive: false}// 不需要缓存
        },
      ]
    }

  ]
})
