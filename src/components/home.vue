<template>
    <div :style="style" class="home">
       <Header @random="randomPlay" :play="play"/>
        <div class="main">
            <transition name="fade">
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
            </transition>
            <transition name="fade">
                <router-view v-if="!$route.meta.keepAlive"></router-view>
            </transition>
        </div>
        <!-- 歌曲 -->
       <Footer />
       <div>
           <audio id="music-play" data-src="" src=""></audio>
       </div>
    </div>
</template>
<script>
import Header from './header.vue'
import Footer from './footer.vue'
import {getTime,getColor,getQiniuToken} from '@/static/js/index.js'
import {
  IT120_QQMUSIC_SEARCH,
  IT120_QQMUSIC_NEW,
  IT120_QQMUSIC_HOT,
  IT120_QQMUSIC_URL,
  IT120_QQMUSIC_LRC,
  IT120_QQMV_SHOUBO
} from '@/assets/api/index.js'
// import {audioPlayer} from '@/static/js/player.js'

    export default{
        name:'Home',
        components:{
            Header,
            Footer,
        },
        data(){
            return{
                style:null,
                src:'',
                songList:[],
                play:{
                    op:1,
                    title:'🎵',
                    singer:'',
                    src:'',
                    isplay:false,
                    status:false,
                    img:"http://p3.music.126.net/ngMYX6gS8r3r35df8BwwuQ==/109951163570136187.jpg?param=200y200",
                },
            }
        },
        computed:{
            dom:()=>{
                return document.getElementById('music-play')
            }
        },
        mounted() {
            // getQiniuToken()
            // this.$router.push('/zhihu')
            // console.log(getColor(19));
            // this.style=`background:${getColor(19).color};`
            this.init()
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
                        //url
                        this.play.src=this.dom.src=JSON.parse(data).url
                        //play
                        this.dom.autoplay=true
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
                //hui
                switch(this.play.op){
                    case 1:
                    //xunhuan
                    this.randomPlay()
                    break
                    case 2:
                    console.log('单曲循环')
                    break
                    case 3:
                    //shunxu
                    this.playing('pause')
                    break
                }
            })
             target.addEventListener("pause", ()=> {
                 this.play.isplay=false
             })

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
            randomPlay(){
                let random = Math.ceil((Math.random())*30)
                let round = Math.round(Math.random())
                let list = JSON.parse(localStorage.getItem('qqmusic-top-list'))
                if(!list){
                    this.$router.push('/qqMusic')
                    return
                }
                let check=list[round].songlist[random].data
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
           
        }
       
    }
</script>
 <style lang="">
    .home{
        width:100%;
        overflow: hidden;
    }
    .home .main{
        width:100%;
        max-width:800px;
        overflow: hidden;
        margin:60px auto;
    }
 </style>