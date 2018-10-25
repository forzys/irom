<template>
  <div class="kaiyan">
    <Scroll :on-reach-bottom="init" :height="height">
      <div v-for="(item,i) in data" :key="i" >
        <div v-if="item.type=='video'" :class="'eye-'+i" @click="playVideo(item)">
          <div  class="cover" :style="{backgroundImage:item.data&&item.data.cover?`url(${item.data.cover.detail})`:'#ccc'}">
            <div class="title">
              <p style="font-size:16px">{{item.data.title}}</p>
              <p>#{{item.data.category}}</p>
              <br />
              <p class="des">{{item.data.description}}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="nextUrl=='over'" style="text-align:center;font-size:16px;">
        <a @click="nextModel=true" v-show="!nextModel">已经快没有了哦,点我继续加载</a>
        <div v-if="nextModel" v-for="(item,i) in data" :key="i">
          <div v-if="item.type=='videoCollectionWithCover'||item.type=='videoCollectionOfFollow'" >
              <div v-for="(res,j) in item.data.itemList" :key="j" :class="'eye-'+i+j" @click="playVideo(res)">
                 <div  class="cover" :style="{backgroundImage:res.data&&res.data.cover?`url(${res.data.cover.detail})`:'#ccc'}">
                  <div class="title">
                    <p style="font-size:16px">{{res.data.title}}</p>
                    <p>#{{res.data.category}}</p>
                    <br />
                    <p class="des">{{res.data.description}}</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      
    </Scroll>
     <Modal
        :title="video.title"
        v-model="video.isShow"
        :draggable=true
        >
          <!-- 播放主体 -->
          <VideoModel v-if="video.isShow" :data="video" @videoerr="videoErr" />
          <!-- footer -->
          <div slot="footer">
            <Dropdown placement="bottom-start" @on-click="(i)=>{video.i=i}">
              <a href="javascript:void(0)">
                  高清-清晰度<Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list" style="text-align:left">
                  <DropdownItem name='0'>高清</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
      </Modal>
  </div>
</template>

<script>
import {
  IT120_KAIYAN_INDEX,
} from '@/assets/api/index.js'

import VideoModel from '@/components/video.vue'

export default {
  name:"kaiyan",
  components:{
    VideoModel
  },
  data(){
    return{
      data:[],
      nextUrl:' ',
      nextModel:false,
      height:'',
      video:{
        title:'',
        arr:[],
        i:0,
        isShow:false,
      }
    }
  },
  mounted(){
    this.init();
    this.height=window.screen.availHeight
  },
  methods:{
    init(){
      if(this.nextUrl=='over'){
        return
      }
      IT120_KAIYAN_INDEX(this.nextUrl).then(res=>{
        // console.log(res)
        this.nextUrl=!!res.data.nextPageUrl?res.data.nextPageUrl.split('?')[1]:'over'
        res.data.itemList.forEach(ele => {
          this.data.push(ele)
        });

      }).catch()
    },
    playVideo(res){
      document.getElementById('music-play').pause();
      this.video.arr=[res.data.playUrl]
      this.video.title=res.data.title
      this.video.isShow=true
       
    },
    videoErr(v){
      console.log(v)
    },
   
  }

}
</script>

<style scoped>
/* a{
  color:#fff;
  text-decoration: underline;
} */
p{
  color:#fff;
}
div[class^="eye-"]{
  width:80%;
  height:250px;
  /* line-height: 250px; */
  margin:20px auto;
  overflow: hidden;
}
.cover{
    width:100%;
    height:100%;
    background-position: 50%;
    background-size: cover;
    cursor: pointer;
    position: relative;
    text-align: center;
}
.title{
  -moz-transition:ease-out .4s;
  -o-transition:ease-out .4s;
  -webkit-transition:ease-out .4s;
  transition:ease-out .4s;
  transform: translateY(250px);
  color:#fff;
  font-size:16px;
  width:100%;
  height:100%;
  overflow: hidden;
}

.cover:hover > .title{
  background-color: rgba(0,0,0,.4);
  transform: translateY(0);
}
.title .des{
  width:70%;
  text-align: left;
  margin:0 auto;
}

</style>
