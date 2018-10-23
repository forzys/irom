<template>
  <div class="music-1">
    <transition name="fade">
    <!-- 榜单 -->
    <div class="top-list" v-show="isTopShow">
      <Card v-for="(item,index) in songList" :key="index" class="card">
        <p slot="title" class="title">
            <Icon type="ios-musical-notes" />
            {{item.title}}
            <Badge :count="30" slot="extra" />
        </p>
        <a href="#" @click.prevent="init" class="content">
            <img :src="item.pic" alt="" @click="isShow(index)">
        </a>
        <CellGroup>
            <Cell v-for="(v,i) in item.songlist.slice(0, 5)" :key="i">
                <Icon type="ios-play-outline" @click="play(v.data)"/>
                <Icon type="ios-film-outline" v-if="!!v.data.vid" @click="mvPlay(v.data.vid)"/>

               <span>{{v.data.songname}}</span>
               <span>{{v.data.singer[0].name||'未知'}}</span>

               <small slot="extra">
                  {{
                    Math.floor(v.data.interval/60)+':'+
                    (v.data.interval%60>10?v.data.interval%60:'0'+v.data.interval%60)
                  }}
              </small>
            </Cell>
        </CellGroup>
        <!-- <p class="info" v-html="item.info">
        </p> -->
        <p v-if="!!item.error">
          {{item.error}}
        </p>
      </Card>
    </div>
    </transition>
    <!-- 榜单end -->
    <!-- 列表 -->
     <transition name="fade">
       <MusicList v-if="isListShow" :data="list" :title="title" @back="mback" @mvPlay="mvPlay" @play="play" />
    </transition>
     <transition name="fade">
      <Modal
        :title="video.title"
        v-model="video.isShow"
        :fullscreen="video.full"
        :draggable=true
        >
        <!-- 关闭按钮 -->
          <!-- <div slot="header" style="text-align:right">
            <Icon type="ios-expand" @click="video.full=!video.full"/>
            <Icon type="ios-close" @click="video.isShow=false" />
          </div> -->
          <!-- 播放主体 -->
          <div class="video-modal" style="width:100%">
            <video v-if="video.isShow" autoplay :src="video.arr[video.i]" width="100%" height="200" :onerror="videoErr" controls>
              浏览器不支持 Video 播放器
            </video>
          </div>
          <!-- footer -->
          <div slot="footer">
            <Dropdown
              placement="bottom-start"
              @on-click="(i)=>{video.i=i}">
              <a href="javascript:void(0)">
                  {{video.i==0?'标清-':'高清-'}}清晰度<Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list" style="text-align:left">
                  <DropdownItem name=0 >标清</DropdownItem>
                  <DropdownItem :name="video.arr.length-1">高清</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
      </Modal>
    </transition>


  </div>
</template>

<script>
import {
  IT120_QQMUSIC_SEARCH,
  IT120_QQMUSIC_NEW,
  IT120_QQMUSIC_HOT,
  IT120_QQMUSIC_URL,
  IT120_QQMUSIC_LRC,
  IT120_QQMV_SHOUBO
} from '@/assets/api/index.js'
import MusicList from '@/components/list.vue'
export default {
  name:'qqMusic',
  components:{
    MusicList
  },
  data(){
    return{
      data:'',
      title:'',
      songList:[],
      video:{
        arr:[],
        title:'播放',
        i:0,
        full:false,
        isShow:false
      },
      list:[],
      isTopShow:true,
      isListShow:false,
     
    }
   
  },
  mounted() {
    let audio=new Audio()
    this.audio=audio;
    this.init();
  },
  methods:{
    init(){
      let list=localStorage.getItem('qqmusic-top-list')
      //判断本地存储数据是否存在
      if(!!list){
          this.songList=JSON.parse(list)
          return
      }else{
         this.$Message.error({
            content:'获取信息出错',
            duration:5,
          })
      }
    },
    mback(){
      this.isListShow=false;
      this.isTopShow=true;
    },
    play(v){
      //构造Url（可绕过版权和登陆限制）
      // let url=`http://ws.stream.qqmusic.qq.com/C100${v.data.songmid}.m4a?fromtag=0&guid=0`
      IT120_QQMUSIC_URL(v.songmid||v.mid).then(res=>{
        let url=("http://140.207.247.14/amobile.music.tc.qq.com/"+res.data.data.midurlinfo[0].purl)
        let dom = document.getElementById('music-play')
        let arr={
          name:v.songname||v.name,
          id:v.songid||v.id,
          mid:v.songmid||v.mid,
          vid:v.vid,
          singer:v.singer[0].name||v.singer,
          interval:v.interval,
          url:!!res.data.data.midurlinfo[0].purl?url:`http://ws.stream.qqmusic.qq.com/C100${v.songmid}.m4a?fromtag=0&guid=0`,
          // url:`http://ws.stream.qqmusic.qq.com/C100${v.songmid}.m4a?fromtag=0&guid=0`,
          pic:!!v.pic?v.pic:`http://imgcache.qq.com/music/photo/album_300/${v.albumid%100}/300_albumpic_${v.albumid}_0.jpg`,
      }
      dom.setAttribute('data-src',JSON.stringify(arr))
      }).catch(error=>{
        console.log(v)
      })
      
    },
    mvPlay(vid){
      let url=[]
      document.getElementById('music-play').pause();
      IT120_QQMV_SHOUBO(vid).then(res=>{
        if(!res.getMvUrl&&!res.getMvUrl.data){return}
        for(let i in res.getMvUrl.data){
          res.getMvUrl.data[i].mp4.forEach(item=>{
            item.freeflow_url.length>0?url=url.concat(item.freeflow_url):''
          })
        }
        this.video.arr=[...new Set(url)]
        this.video.isShow=true
      }).catch(error=>{
        console.log(error)
      })
      console.log(this.video.arr)
    },
    videoErr(){
      console.log('可能是播放地址失效')
      this.video.i>this.video.arr.length-1?this.video.i=0:this.video.i++
    },
   
    isShow(id){
      //清洗数据
      if(!!String(id)){
        let arr=[];
        this.songList[id].songlist.forEach(ele => {
          arr.push({
            name:ele.data.songname,
            id:ele.data.songid,
            mid:ele.data.songmid,
            vid:ele.data.vid,
            singer:ele.data.singer[0].name,
            interval:ele.data.interval,
            // url:,
            // url:`http://ws.stream.qqmusic.qq.com/C100${ele.data.songmid}.m4a?fromtag=0&guid=0`,
            pic:`http://imgcache.qq.com/music/photo/album_300/${ele.data.albumid%100}/300_albumpic_${ele.data.albumid}_0.jpg`,
          })
        });
        this.list=arr
        this.title=this.songList[id].title
        arr=null
        this.isListShow=!this.isListShow
      }
      this.isTopShow=!this.isTopShow
    },
    
  }
}
</script>

<style>
.music-1{
  width:100%;
  overflow: hidden;
}
.top-list{
  width:90%;
  margin:0 auto;
}
.card{
  max-width:350px;
  min-width:300px;
  height:420px;
  margin:10px auto;
  display:inline-block;
}
.card .title{
  text-align: center;
}
.card .content{
  width:100%;
  overflow: hidden;
}
.card .content img{
  width:100%;
}
.card .info{
  font-size: 12px;
}
.card .ivu-cell span{
  margin:0 10px;
  text-align: center;
}
.card:nth-child(1){
  margin:10px;
}
</style>
