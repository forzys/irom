<template>
  <nav class="header">
      <div></div>
      <div class="right">
       <!-- 天气 -->
        <span>
          <Dropdown trigger="click" transfer>
              <Icon type="ios-partly-sunny-outline" size="22" />
              <DropdownMenu slot="list" v-show="!!weather">
                  <DropdownItem disabled>
                    <p>{{weather.name}}</p>
                    <div> 空气: {{weather.air}}  pm2.5:{{weather.pm25}}</div>
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
        <span >
          <Icon type="ios-settings-outline" size="22" />
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
</template>

<script>
import { 
  IT120_WEATHER, 
  IT120_ROBOT, 
  IT120_QQMUSIC_NEW, 
  IT120_QQMV_SHOUBO,
  IT120_QQMUSIC_URL,
  IT120_QQMUSIC_LRC
} from '@/assets/api/index.js'
import { getExpress, musicUrl } from '@/static/js/index.js'

export default {
  name:'Header',
  data(){
    return{
      count:1,
      weather:'',
      notice:'这里获取到信息',
      playing:{
        title:'音乐',
        status:false,
        playing:true,
        img:'http://p1.music.126.net/RnOZHM0BNxXuy-RwQQI5BA==/3313928048221849.jpg?param=140y140',
      },
      key:'',
    }
  },
  mounted() {
    this.init();
    IT120_QQMV_SHOUBO().then(res=>{
      console.log(res)
    })
    
    window.play = (w)=>{
      this.play(w)
    }

  },
  methods:{
    init(){
      //获取天气信息
      IT120_WEATHER().then(res=>{
        let result=res.data.result.data
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
      this.$Notice.open({
          title: this.notice.title||'通知',
          desc: this.count==0? '  暂时没有最新通知呢亲！' : this.notice
      });
      this.count=0;
    },
    // 播放音乐相关
    play(w){
      if(w=='play'||w=='pause'){
        this.playing.status=!this.playing.status
      }
      if(w=='last'){
      }
      if(w=='next'){
      }

      setTimeout(()=>{
        this.$Notice.close('playMusic');
        this.playingMusicNotice();
      },300)
    },
    playingMusicNotice(){
      this.$Notice.open({
        name:'playMusic',
        title:this.playing.title,
        desc: '没有正在播放的音乐哦🎵',
        duration:0,
        render:h=>{
          return (
            <div>
              {
                !!this.playing.playing?
                <div style="width:100%;padding:5px;">

                  <span style="float:left;width:80px;height:60px;">
                      <img src={this.playing.img} style="width:100%;height:100%;border-radius:5px;" />
                  </span>

                  <div style="overflow:hidden;display:flex;height:60px;">
                      <span style="margin:auto;">
                          <i class="ivu-icon ivu-icon-md-skip-backward" onclick="play('last')" style="font-size:22px;"/>
                          {
                            !!this.playing.status?
                            <i class="ivu-icon ivu-icon-md-pause" onclick="play('play')" style="font-size:22px;margin:0 30px;"/>
                            :<i class="ivu-icon ivu-icon-md-play" onclick="play('pause')" style="font-size:22px;margin:0 30px;"/>
                          }
                          <i class="ivu-icon ivu-icon-md-skip-forward" onclick="play('next')" style="font-size:22px;"/>
                      </span>
                  </div>

                </div>
                :<span>
                  <a onclick="play('exit')">
                    没有正在播放的音乐哦🎵
                  </a>
                </span>
              }
            </div>
          )
        },
      });
    }
  },
}
</script>

<style>
.header{
  width:100%;
  min-height:50px;
  display:flex;
  justify-content: center;
  align-items: center;
}
.header>div{
  flex:1;
}
.right{
  text-align: right;
  margin:0 20px;
}
.right>span{
  margin:0 10px;
}
.right i{
  cursor: pointer;
}


</style>
