<template>
  <div class="header">
      <div></div>
      <div class="right">
       
        <span><Icon type="ios-partly-sunny-outline" size="22" /></span>
        <span><Icon type="ios-settings-outline" size="22" /></span>
        <span @click="count=0">
           <Badge :count="count">
               <Icon type="md-bulb" size="22" />
            </Badge>
          </span>
      </div>

  </div>
</template>

<script>
export default {
  name:'Header',
  data(){
    return{
      drawe:false,
      count:5,
      time:(new Date()).getTime()
    }
  },
  mounted() {
    
  },
  methods:{},
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
}
.right>span{
  margin:0 10px;
}

</style>
