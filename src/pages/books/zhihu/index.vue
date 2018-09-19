
<template>
  <div class="zhihu">
    <!-- 图片跨域 -->
    <!-- <meta name="referrer" content="no-referrer" /> -->

  </div>
</template>

<script>
import { ZHIHULATEST } from '@/assets/api/index.js'
export default {
  name:'zhihu',
  data(){
    return{
      data:[],
    }
  },
  mounted() {
    this.init();
  },
  methods:{
    init(){
      //获取知乎日报最新更新
      ZHIHULATEST('/zhihu/4/news/latest').then(res=>{
        console.log(res)
      }).catch(e=>{
        console.log(e)
      })
    },
    goDetail(){
     
    }
  }

}
</script>

<style>

</style>
