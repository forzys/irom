<template>
    <!-- 主要记录时间与进度 -->
   <div class="timeline">
      <Timeline>
        
        <TimelineItem>
           <p class="time">
              <img src="https://img.shields.io/badge/2018--09--19-brightgreen.svg" />
           </p>
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
    },
  }
</script>
<style scoped>
.timeline{
  width:50vw;
  margin:1vw auto;
}
.time{
  font-size: 16px;
  font-weight: bold;
  vertical-align: middle;
}
.content{
  padding-left: 5px;
}
</style>
