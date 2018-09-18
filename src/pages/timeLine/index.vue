<template>
    <!-- 主要记录时间与进度 -->
   <div class="timeline">
      <Timeline>
        <TimelineItem>
           <p class="time">2018-09-19</p>
            <p class="content">敲下项目第一行代码</p>
        </TimelineItem>
    </Timeline>
   </div>
</template>
<script>
  export default{
    name:'TimeLine',
    data(){
      return{}
    },
    mounted() {
      // console.log('lll')
    },
  }
</script>
<style scoped>
.time{
  font-size: 14px;
  font-weight: bold;
}
.content{
  padding-left: 5px;
}
</style>
