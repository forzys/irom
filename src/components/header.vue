<template>
  <div class="header">

    <div class="left">
      <!-- <Icon type="md-reorder" size="30" @click="drawe=true"/>
      <Drawer title="菜单" placement="left" :closable="false" v-model="drawe">
      </Drawer> -->
    </div>

    <div class="right">
      <span>
       <Icon type="md-person" size="22" />
      </span>
      <span>
        <Icon type="md-cloudy" size="22" />
      </span>
      <span>
        <Icon type="md-settings" size="22" />
      </span>
    </div>

  </div>
</template>

<script>
export default {
  name:'Header',
  data(){
    return{
      drawe:false
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
