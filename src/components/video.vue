<template>
  <div>
    <video :src="url">
        浏览器不支持
    </video>
  </div>
</template>

<script>
export default {
  name:'mVideo',
  data(){
    return{
      url:'',
      data:[],
    }
  },
  mounted() {
    
  },
}
</script>

<style>

</style>
