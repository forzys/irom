<template>
  <div class="list">
    <BackTop></BackTop>
     <Icon type="ios-arrow-round-back" class="back" size="26" @click="$emit('back')" />
      <CellGroup>
        <div class="title">{{title}}</div>
        <Cell v-for="(v,i) in data" :key="i">
              <Icon type="ios-play-outline" @click="play(v)"/>
              <Icon type="ios-film-outline" v-if="!!v.vid" @click="playMv(v.vid)"/>
              <span>{{v.name}}</span>
              <span>{{v.singer||'未知'}}</span>
              <small slot="extra">
                {{
                  Math.floor(v.interval/60)+':'+
                  (v.interval%60>10?v.interval%60:'0'+v.interval%60)
                }}
            </small>
        </Cell>
      </CellGroup>
  </div>
</template>

<script>
export default {
  name:'List',
  props:{
    data:{ type:Array, required: true},
    title:{ type:String, required: true},
  },
  data(){
    return{
      src:'',
    }
  },
  mounted() {
  },
  methods:{
    play(v){
      let dom = document.getElementById('music-play')
      dom.src=v.url
      dom.autoplay=true
      dom.setAttribute('data-src',JSON.stringify(v))
    },
    playMv(v){
      console.log(v)
    },
  }
}
</script>

<style scoped>
.list{
  width:70%;
  margin:0 auto;
}
.title{
  width:100%;
  text-align: center;
  font-size:16px;
  color:#000;
}
.back{
  color:#ed4014;
  cursor: pointer;
  transition: margin 1s;
}
.back:hover{
  margin-left:10px;
}
.ivu-cell-title >span{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space:nowrap
}
</style>
