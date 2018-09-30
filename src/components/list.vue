<template>
  <div class="list">
      <CellGroup>
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
      <audio :src="src" width=0 autoplay :onended="ended(src)"></audio>
  </div>
</template>

<script>
export default {
  name:'List',
  props:{
    data:{ type:Array, required: true}
  },
  data(){
    return{
      src:'',
    }
  },
  mounted() {
    this.init()
  },
  methods:{
    init(){

    },
    play(v){
      this.src=v.url
    },
    playMv(v){
      console.log(v)
    },
    loop(src){
      console.log('this.data')
    },
    ended(src){
      console.log('ended')
    }

  }
}
</script>

<style>

</style>
