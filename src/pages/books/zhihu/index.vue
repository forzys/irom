
<template>
  <div class="zhihu">
    <!-- 图片跨域 -->
    <meta name="referrer" content="no-referrer" />
  
    <!-- 导航 -->
   <Menu 
      mode="horizontal"
      active-name="1"
      @on-select="select"
      style="display:flex;">
      <MenuItem name="1" style="flex:1;text-align:center;">
          最近更新
      </MenuItem>
      <MenuItem name="2" style="flex:1;text-align:center;">
          主题栏目
      </MenuItem>
    </Menu>
    <!-- 列表 -->
    <div class="list">
      <div 
        class="card"
        v-for="(item,i) in data"
        :key="i"
        @click.stop="name=='1'?goDetail(item.id):goThemes(item.id)">
        <img :src="item.images[0]" />
        <p class="title">{{item.title}}</p>
      </div>
    </div>

  </div>
</template>
<script>
import { ZHIHULATEST,ZHIHUDETAIL,ZHIHUTHEMES,ZHIHUTHEMESLIST} from '@/assets/api/index.js'
export default {
  name:'zhihu',
  data(){
    return{
      img:require('@/static/404.jpg'),
      name:'1',
      data:[],
    }
  },
  mounted() {
    this.init();
  },
  methods:{
    //进入时初始化//获取知乎日报最新更新
    init(){
      this.data=[]
       this.$Spin.show()
      ZHIHULATEST('/zhihu/4/news/latest').then(res=>{
        this.data=res.stories
        this.data.push({
          id:'',
          title:'点击查看更多',
          images:[''],
        })
        this.$Spin.hide()
      }).catch(e=>{
       this.$Spin.hide()
      })
    
    },
    // 选择导航栏目
    select(e){
      this.name=e.toString();
      this.name=='1'?this.init():this.getThemes()
    },
    //点击进入详情
    goDetail(id){
     this.$Spin.show()
      id!=''?
      this.$router.push({
        name: 'Detail',
        query: {id: id}}
      ):
      ZHIHUDETAIL('hot').then(res=>{
        let data=res.recent;
        this.data.pop();
        data.forEach(item => {
          this.data.push({
            id:item.news_id,
            title:item.title,
            images:[item.thumbnail],
          })
        })
        this.$Spin.hide()
      }).catch(e=>{
       this.$Spin.hide()
      })
    },
    //选择主题栏目
    getThemes(){
      this.$Spin.show()
      ZHIHUTHEMES().then(res=>{
        let data=[];
        res.others.forEach(item=>{
          data.push({
            id:item.id,
            title:`(${item.name})--${item.description}`,
            images:[item.thumbnail]
          })
        })
        this.data=data
        this.$Spin.hide()
      }).catch(e=>{
        this.$Spin.hide()
      })
    },
    //点击栏目详情
    goThemes(id){
       this.$Spin.show()
      this.name='1'
      history.pushState(null, null, document.URL);
      ZHIHUTHEMESLIST(id).then(res=>{
       this.data=[]
       let image=''
       res.stories.forEach(item=>{
         item.images?image=item.images[0]:image=this.img
         this.data.push({
           id:item.id,
           title:item.title,
           images:[image]
         })
       })
        this.$Spin.hide()
      }).catch(e=>{
        console.log(e)
         this.$Spin.hide()
      })
    },
  }
}
</script>

<style scoped>
.zhihu{
  width:70vw;
  margin:0 auto;
}
.list>.title{
  margin:10px auto;
  text-align: center;
  font-size:18px;
  
}
.card{
  width:70vw;
  margin:10px auto;
  display: flex;
  align-items: center;
  padding:5px;
  border: 1px solid #dcdee2;
  border-color: #e8eaec;
  transition: all .2s ease-in-out;
  border-radius:4px;
  cursor: pointer;
}
.card:hover{
  box-shadow: 0 1px 6px rgba(0,0,0,.2);
  border-color: #eee;
}
.card img{
  max-width:25%;
  margin:2px;
}
.card .title{
  font-size:12px;
  display: -webkit-box;
  margin-left:15px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /*截取第三行*/
  overflow: hidden;
}
.card:last-child .title{
  width:100%;
  margin:0;
  text-align: center;
  color:#e12;
}
</style>
