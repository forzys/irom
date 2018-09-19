
<template>
  <div class="zhihu">
    <!-- 图片跨域 -->
    <meta name="referrer" content="no-referrer" />
    <Row>
      <Col v-for="(item) in data" :key="item.id" span="10" offset="1">
        <Card style="margin:10px auto;" class="card">
          <div style="text-align:center" @click.stop="goDetail(item.id)">
            <p slot="title" class="title">
              <a href="#">{{item.title}}</a>
            </p>
            <img :src="item.images[0]" />
          </div>
        </Card>
      </Col>
    </Row>
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
        this.data=res.stories
        this.data.push({
          id:'000',
          title:'点击查看更多',
          images:['']
        })
      }).catch(e=>{
        console.log(e)
      })
    },
    goDetail(id){
     console.log(id)
    }
  }

}
</script>

<style scoped>
.zhihu{
  width:80%;
  margin:0 auto;
  overflow: hidden;
}
.card img{
  width:100%;
}
.title{
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  height:5vw;
  line-height: 5vw;
}
</style>
