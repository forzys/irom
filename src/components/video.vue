<template>
   <div class="video-modal" style="width:100%">
      <video autoplay :src="data.arr[data.i]" width="100%" height="200" @error.stop.prevent="$emit('videoerr')" controls poster>
        浏览器不支持 Video 播放器
      </video>
    </div>
</template>

<script>
export default {
  name:'videoModel',
   props:{
    data:{ type:Object, required: true},
  },
  data(){
    return{
    }
  },
  mounted() {
    
  },
}
</script>

<style>

</style>
