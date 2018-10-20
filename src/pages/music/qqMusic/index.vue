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
                <Icon type="ios-play-outline" @click="play(v.data.songmid,v.data.songid,v.data.songtype)"/>
                <Icon type="ios-film-outline" v-if="!!v.data.vid" @click="playMv(v.data.vid)"/>

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
       <MusicList v-if="isListShow" :data="list" />
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
      songList:[],
      list:[],
      audio:null,
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
      }
      //获取新歌榜
      IT120_QQMUSIC_NEW().then(res=>{
       let newSongList={
         title:res.data.topinfo.ListName,
         info:res.data.topinfo.info,
         pic:res.data.topinfo.pic_h5,
         songlist:res.data.songlist,
       }
       !!JSON.stringify(newSongList)?
       this.songList.push(newSongList):
       this.songList.push({error:'获取新歌榜数据失败'});
       newSongList=null
      }).catch(error=>{
        this.songList=[]
         this.songList.push({error:'获取新歌榜数据失败'})
      })
      //获取热歌榜
      IT120_QQMUSIC_HOT().then(res=>{
        let hotSongList={
          title:res.data.topinfo.ListName,
          info:res.data.topinfo.info,
          pic:res.data.topinfo.pic_h5,
          songlist:res.data.songlist,
        }
        !!JSON.stringify(hotSongList)?
        this.songList.push(hotSongList):
        this.songList.push({error:'获取热歌榜数据失败'});
        hotSongList=null
      }).catch(error=>{
        this.songList=[]
        this.songList.push({error:'获取热歌榜数据失败'})
      })
      //5秒后缓存榜单到本地(出错跳过)
      try{
        setTimeout(()=>{
          if(!!this.songList[0].error){return}
          let data=JSON.stringify(this.songList)
          !!data?localStorage.setItem('qqmusic-top-list',data):''
          data=null
        },5000)
      }catch(e){
        this.$Message.error({
          content:'天啊噜，发生了很严重的问题！！数据保不住了,将清除站点的localStorage。',
          duration:5,
        })
        localStorage.clear()
      }
    },



    play(songmid,songid,type){
      //构造Url（可绕过版权和登陆限制）
      let url=`http://ws.stream.qqmusic.qq.com/C100${songmid}.m4a?fromtag=0&guid=0`

      // IT120_QQMUSIC_URL(songmid).then(res=>{

      //   // res.data.data.sip.forEach(item => {
      //   //   url.push("http://140.207.247.14/amobile.music.tc.qq.com/"+res.data.data.midurlinfo[0].purl)
      //   // });
        this.audio.src=url
        this.audio.load();
        this.audio.play();
      // }).catch(error=>{
      //   console.log(error)
      // })
    },



    playMv(vid){
      IT120_QQMV_SHOUBO(vid).then(res=>{
        console.log(res)

      }).catch(error=>{
        console.log(error)
      })
    },
    isShow(id){
      console.log(id)
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
            url:`http://ws.stream.qqmusic.qq.com/C100${ele.data.songmid}.m4a?fromtag=0&guid=0`,
          })
        });
        this.list=arr
        arr=null
        this.isListShow=!this.isListShow
        console.log(this.list)
      }

      this.isTopShow=!this.isTopShow
    }
    

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
</style>
