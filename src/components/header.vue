<template>
<div class="header" :style="{backgroundColor:style.bgcolor}">
  <nav class="header-nav">
      <div class="left" @click="$router.push('/')">
        <img :src="style.logoimg" alt="logo" onerror="this.style.display='none'">
      </div>
      <div class="right" :style="{color:style.color}">
        <!-- 天气 -->
        <span>
          <Dropdown trigger="click" style="text-align:left">
            <Icon type="ios-partly-sunny-outline" size="22" :style="{color:style.color}"/>
            <DropdownMenu slot="list" v-show="!!weather">
                <DropdownItem disabled>
                  <p>{{weather.name}}</p>
                  <div>空气:{{weatsher.air}}  pm2.5:{{weather.pm25}}</div>
                  <span>白天：</span>
                  <div>
                    {{weather.day_temperature}}℃  {{weather.day_weather}}  {{weather.day_wind}} 
                  </div>
                  <span>夜晚：</span>
                  <div>
                    {{weather.night_temperature}}℃  {{weather.night_weather}}  {{weather.night_wind}} 
                  </div>
                </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </span>
        <!-- 设置 -->
        <span>
           <Icon type="ios-settings-outline" size="22" @click="dropVisible=!dropVisible" />
           <Dropdown trigger="custom" 
                :visible="dropVisible" 
                placement="bottom-end" 
                @on-clickoutside="dropVisible=false">
              <DropdownMenu slot="list">
                  <DropdownItem>
                   <div>
                     <span>导航颜色:</span>
                     <ColorPicker v-model="style.color" size="small" />
                     <a @click="style.color='#b4a078'">&nbsp;&nbsp;默认</a>
                   </div>
                   <div>
                    <span>导航背景:</span>
                     <ColorPicker v-model="style.bgcolor" size="small" />
                     <a @click="style.bgcolor='#fff'">&nbsp;&nbsp;默认</a>
                   </div>
                   <div style="text-align:left">
                    <span>设置logo:</span>
                     <Poptip trigger="focus">
                        <Input v-model="style.logoimg" style="max-width:60px;"></Input>
                        <div slot="content">{{ style.logoimg }}</div>
                    </Poptip>
                     <Upload action="//jsonplaceholder.typicode.com/posts/"
                            :max-size="100"
                            style="display:inline">
                      <Icon type="ios-cloud-upload-outline" size="18"/>
                    </Upload>
                      <!-- <span>
                        <Upload action="//jsonplaceholder.typicode.com/posts/">
                          上传
                        </Upload>
                      </span> -->
                   </div>
                   <div></div>
                   <div></div>
                  </DropdownItem>
              </DropdownMenu>
            </Dropdown>
        </span>
        <!-- 音乐 -->
        <span @click="playingMusicNotice">
          <Icon type="ios-musical-notes-outline" size="22"/>
        </span>
        <!-- 通知 -->
        <span @click="getNotice">
            <Badge dot :count="count">
               <Icon type="md-bulb" size="22" />
            </Badge>
        </span>
      </div>

  </nav>
</div>
</template>

<script>
import { IT120_WEATHER, 
        IT120_ROBOT,
        IT120_QQMUSIC_NEW,
        IT120_QQMV_SHOUBO,
        IT120_QQMUSIC_URL,
        IT120_GETNOTICE,
        IT120_QQMUSIC_LRC
        } from '@/assets/api/index.js'
import { getExpress,musicUrl} from '@/static/js/index.js'

export default {
  name:'Header',
  data(){
    return{
      count:1,
      weather:'',
      style:{
        logoimg:'http://p3.music.126.net/ngMYX6gS8r3r35df8BwwuQ==/109951163570136187.jpg?param=200y200',
        bgcolor:'#fff',
        color:'#b4a078',
      },
      dropVisible:false,
      play:{
        op:1,
        title:'🎵',
        singer:'',
        isplay:false,
        status:false,
        img:"http://p3.music.126.net/ngMYX6gS8r3r35df8BwwuQ==/109951163570136187.jpg?param=200y200",
      },
      key:'',
    }
  },
  computed:{
    dom:()=>{
      return document.getElementById('music-play')
    }
  },
  mounted() {
    this.init();
    // IT120_QQMV_SHOUBO().then(res=>{
    //   console.log(res)
    // })
    window.playing=(w)=>{
      this.playing(w)
    }
    // Firefox和Chrome早期版本中带有前缀
    let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    // 选择目标节点
    let target = document.getElementById('music-play'); 
    // 创建观察者对象
    var observer = new MutationObserver((mutations)=>{  
        mutations.forEach((mutation)=>{ 
          if(mutation.attributeName=='data-src'){
            let data=this.dom.getAttribute('data-src')
            this.play.title=JSON.parse(data).name
            this.play.img=JSON.parse(data).pic
            this.play.singer=JSON.parse(data).singer
            this.play.status=true;
            this.play.isplay=true;
          }
        }); 
    }); 
    // 配置观察选项:
    var config = { attributes: true} 
    // 传入目标节点和观察选项
    observer.observe(target, config); 
    // 随后,你还可以停止观察
    // observer.disconnect();
    target.addEventListener("ended", ()=> {
      if(this.play.op!==2){
         this.randomPlay()
      }
    })
    
    window.play = (w)=>{
      this.play(w)
    }

  },
  methods:{
    init(){
      //获取天气信息
      IT120_WEATHER().then(res=>{
        let result=res.result.data
        let obj={
          name:result.info.name,
          air:result.air.description,
          pm25:result.air.pm25,
          day_weather:result.days.day[0].day_weather_type,
          night_weather:result.days.day[0].night_weather_type,
          day_temperature:result.days.day[0].day_temperature,
          night_temperature:result.days.day[0].night_temperature,
          day_wind:result.days.day[0].day_wind_type+result.days.day[0].day_wind_power,
          night_wind:result.days.day[0].night_wind_type+result.days.day[0].night_wind_power,
        };
        this.weather=obj
        result=null
        obj=null
      }).catch(err=>{
        console.log(err)
        this.$Message.error({content:'哎呀，出错了',duration: 3});
      })
    },
    //获取通知
    getNotice(){
      IT120_GETNOTICE().then(res=>{
        res.code==0&&res.msg=='success'?
        this.$Notice.open({
          title: res.data.title,
          render:h=>{
            return (
              <div>
                <span>{res.data.content.slice(3,-4)}</span>
                <p style="text-align:right">{res.data.dateAdd}</p>
              </div>
            )
          }
        }):''
      }).catch()
     this.count=0;
    },
    //获取正在播放的音乐
    getPlayingMusic(){
      this.$Notice.destroy()
      this.$Notice.open({
        name:'musicBar',
        duration:0,
        render:h=>{
          return (
            this.play.status?
            <div style="width:100%;height:80px;margin-top:15px;">
             <div class="ivu-notice-title" style="margin-left:20px">
              《{this.play.title}》&nbsp;&nbsp;&nbsp;{this.play.singer}
             </div>
                <span style="float:left;overflow:hidden;
                          width:80px;height:100%;
                          border:1px solid #ccc;
                          border-radius:40px;">
                <img class={this.play.isplay?'rotation':'rotation rotationed'} 
                    src={this.play.img} style="width:100%;height:100%" draggable="false" />
                </span>
                <div style="overflow:hidden;display:flex;height:90%;">
                  <span style="margin:auto">
                      <i  onclick="playing('last')" class="ivu-icon ivu-icon-md-skip-backward" style="font-size:22px"/>
                      <i v-show={this.play.isplay} class="ivu-icon ivu-icon-md-pause"
                        style="font-size:22px;margin:0 30px"
                        onclick="playing('pause')"/>
                      <i v-show={!this.play.isplay}  class="ivu-icon ivu-icon-md-play" 
                        style="font-size:22px;margin:0 30px"
                        onclick="playing('play')"/>
                      <i onclick="playing('next')" class="ivu-icon ivu-icon-md-skip-forward" style="font-size:22px;margin-right:30px;"/>

                      <i v-show={this.play.op==1} class="ivu-icon ivu-icon-ios-repeat" 
                      title="全部循环"
                      onclick="playing('op')"/>
                      <i v-show={this.play.op==2} class="ivu-icon ivu-icon-ios-refresh" 
                      title="单曲循环"
                      onclick="playing('op')"/>
                      <i v-show={this.play.op==3} class="ivu-icon ivu-icon-ios-shuffle" 
                      title="顺序播放"
                      onclick="playing('op')"/>
                  </span>
                </div>
              </div>:
                <div class="ivu-notice-title">
                  <a href="#" onclick="playing('random')">没有正在播放的音乐哦🎵点我随便听听</a>
                </div>
              )
        }
      });
    },
    playing(w){
     switch(w){
       case 'pause':
          this.play.isplay=false;
          this.dom.pause()
          break;
       case 'play':
            this.play.isplay=true;
            this.dom.play()
          break;
       case 'next':
          this.playing('random')
          break;
       case 'last':
          console.log(w)
          break;
       case 'random':
          this.randomPlay()
          this.play.isplay=true
          this.play.status=true
          break;
       case 'op':
        this.play.op++
        this.play.op>3?this.play.op=1:this.play.op
        this.opPlay()
        break;

       default:
          console.log('default')
     }
    },
    randomPlay(){
      let random = Math.ceil((Math.random())*30)
      let round = Math.round(Math.random())
      let list = JSON.parse(localStorage.getItem('qqmusic-top-list'))
      let check=list[round].songlist[random].data
      console.log(check)
      let arr={
        name:check.songname,
        id:check.songid,
        mid:check.songmid,
        vid:check.vid,
        singer:check.singer[0].name,
        interval:check.interval,
        url:`http://ws.stream.qqmusic.qq.com/C100${check.songmid}.m4a?fromtag=0&guid=0`,
        pic:`http://imgcache.qq.com/music/photo/album_300/${check.albumid%100}/300_albumpic_${check.albumid}_0.jpg`,
      }
      this.dom.src=arr.url
      this.dom.autoplay=true
      this.dom.setAttribute('data-src',JSON.stringify(arr))
    },
    opPlay(){
      this.dom.setAttribute('loop',false)
      switch(this.play.op){
        case 2:
          this.dom.setAttribute('loop',true)
          break
        case 3:
        console.log('3')
        break
        case 1:
        console.log('1')
        break
      }
    }
  },
}
</script>

<style>
i{
  font-size:16px;
  cursor: pointer;
}
.header{
  width:100%;
  position:fixed;
  z-index: 111;
}
.header-nav{
  width:95%;
  min-height:50px;
  margin:0 auto;
  display:flex;
  justify-content: center;
  align-items: center;
  /* position: fixed; */
}
.header-nav>div{
  flex:1;
}
.left{
  max-width:80px;
  height:50px;
  overflow: hidden;
  border-radius:2px;
  margin:5px 25px;
  cursor: pointer ;
}
.left>img{
  width:100%;
  height:100%;
}
.right{
  text-align: right;
  margin:0 30px;
}
.right>span{
  margin:0 10px;
}
.right i{
  cursor: pointer;
}
.ivu-notice-title{
  text-align: center;
  font-size:12px;
  position: relative;
  top:0;
}
@-webkit-keyframes rotation{
from {-webkit-transform: rotate(0deg);}
to {-webkit-transform: rotate(360deg);}
}
.rotation{
-webkit-transform: rotate(360deg);
animation: rotation 10s linear infinite;
-moz-animation: rotation 10s linear infinite;
-webkit-animation: rotation 10s linear infinite;
-o-animation: rotation 10s linear infinite;
}
.rotationed,
.rotation:hover{
  animation-play-state:paused;
  -webkit-animation-play-state:paused; /* Safari 和 Chrome */
}
</style>
