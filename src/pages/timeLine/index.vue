<template>
    <!-- 主要记录时间与进度 -->
   <div class="timeline">
      <Timeline>
        <TimelineItem v-for="(item,i) in list" :key="i">
           <p class="time"><img :src="item.src" />
           </p>
            <p class="content">{{item.content||""}}</p>
        </TimelineItem>
    </Timeline>
   </div>
</template>
<script>
import {IT120_GETNOTICE} from '@/assets/api/index.js'
  export default{
    name:'TimeLine',
    data(){
      return{
        list:[]
      }
    },
    mounted() {
      this.init()
    },
    methods:{
      init(){
        IT120_GETNOTICE(1).then(res=>{
          console.log(res)
          // let src= https://img.shields.io/badge/${2018--09--19}-brightgreen.svg
          res.data.dataList.forEach(res => {
            let dateAdd=res.dateAdd.split(" ")[0].split("-").join("--")
            res.src=`https://img.shields.io/badge/${dateAdd}-brightgreen.svg`
          });
          this.list=res.data.dataList
        }).catch(error=>{
          console.log(error)
          this.$Message.error({
            content:'获取数据出错'
          })
        })
      }
    }
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
