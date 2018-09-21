<template>
  <div class="detail">
    <h3>{{data.title}}</h3>
    <br>
    <div v-html="data.body"></div>
    <remote-css :href="data.css[0]"></remote-css>
  </div>
</template>

<script>
import { ZHIHUDETAIL } from '@/assets/api/index.js'
export default {
  name:'detail',
  components: {
    // 加载外部css组件
    'remote-css': {
        render(createElement){return createElement('style',{attrs:{href:this.href}});},
        props:{href:{type:String,required:true}},
    },
  },
  data(){
    return{
      id: this.$route.query.id||'',
      data:{
        body:'',
        css:['']
      },
    }
  },
  mounted() {
    this.init();
  },
  methods:{
    // 初始化获取文章详情
    init(){
      this.$Spin.show()
      ZHIHUDETAIL(this.id).then(res=>{
        this.data=res
        this.$Spin.hide()
      }).catch(e=>{
        this.$Spin.hide()
      })
    }
  }
}
</script>

<style>
.detail{
  width:70%;
  overflow: hidden;
  text-align: center;
  margin:0 auto;
}
.detail img{
  width:100%;
  max-width:400px;
  display: block;
  margin:0 auto;
}
</style>
