<template>
  <div class="detail">
    <!-- {{{data.body}}} -->
    <h3>{{data.title}}</h3>
    <br>
    <div v-html="data.body"></div>
    <!-- <style :href="data.css[0]"></style> -->
    <remote-css :href="data.css[0]"></remote-css>
  </div>
</template>

<script>
import { ZHIHUDETAIL } from '@/assets/api/index.js'
export default {
  name:'detail',
  components: {
    'remote-css': {
      render(createElement) {
        return createElement('style', { attrs: {  href: this.href }});
      },
      props: {
        href: { type: String, required: true },
      },
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
    init(){
      ZHIHUDETAIL(this.id).then(res=>{
        this.data=res
      }).catch(e=>{
        console.log(e)
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
