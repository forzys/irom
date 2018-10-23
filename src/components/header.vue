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
                  <div>空气:{{weather.air}}  pm2.5:{{weather.pm25}}</div>
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
        <span @click="getPlayingMusic">
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
  props:{
    play:{ type:Object, required: true},
  },
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
          duration: 5,
          render:h=>{
            return (
              <div>
                {h('span', {
                   domProps: {
                      innerHTML: res.data.content
                    },
                })}
                <div style="margin-top:10px">
                <a style="float:left">更多</a>
                 <p style="text-align:right">{res.data.dateAdd}</p>
                </div>
               
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
          this.$emit('random')
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
