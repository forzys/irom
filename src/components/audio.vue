<template>
  <div>
    <audio :src="url" :loop="loop">
      浏览器不支持
    </audio>
  </div>
</template>

<script>
export default {
  name:"mAudio",
  data(){
    return{
      url:'',
      data:[],
    }
  },
  mounted() {
    
  },
  methods:{

  },
  destroyed() {
    console.log('我被销毁了')
  },

}
</script>

<style>

</style>
