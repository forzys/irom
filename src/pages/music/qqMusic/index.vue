<template>
  <div class="music-1">
    <div class="top-list">
       <Card v-for="(item,index) in songList" :key="index" class="card">
        <p slot="title" class="title">
            <Icon type="ios-musical-notes" />
            {{item.title}}
            <Badge :count="30" slot="extra" />
        </p>
        <a href="#" @click.prevent="init" class="content">
            <img :src="item.pic" alt="">
        </a>
        <CellGroup>
            <Cell v-for="(v,i) in item.songlist.slice(0, 5)" :key="i">
                <Icon type="ios-play-outline" @click="play(v.data.songmid)"/>
                <Icon type="ios-film-outline" v-if="!!v.data.vid" @click="playMv(vid)"/>

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
  </div>
</template>

<script>
import {
  IT120_QQMUSIC_SEARCH,
  IT120_QQMUSIC_NEW,
  IT120_QQMUSIC_HOT,
  IT120_QQMUSIC_URL,
  IT120_QQMV_SHOUBO
} from '@/assets/api/index.js'
export default {
  name:'qqMusic',
  data(){
    return{
      data:'',
      songList:[],
    }
  },
  mounted() {
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
    play(songmid){
      IT120_QQMUSIC_URL(songmid).then(res=>{
        console.log(res)
        console.log(res)
        let url=[]
        url.push({url:`http://ws.stream.qqmusic.qq.com/C100${songmid}.m4a?fromtag=0&guid=0`})
        res.data.data.sip.forEach(item => {
          url.push({
            url:item+res.data.data.midurlinfo[0].purl
          })
        });
        console.log(url)
      }).catch(error=>{
        console.log(error)
      })
    },
    playMv(vid){

    }

  }
}
</script>

<style>
.f-right{
  float: right;
}


.top-list{
  display: flex;
}
.card{
  width:350px;
  height:420px;
  display: inline-block;
  margin:10px;
}
.card .title{
  text-align: center;
}
.card .content{
  display: inline-block;
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
