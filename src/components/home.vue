<template>
    <div :style="style" class="home">
       <Header />
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
            }
        },
        mounted() {
            // audioPlayer()
            getQiniuToken()
            // this.$router.push('/zhihu')
            // console.log(getColor(19));
            // this.style=`background:${getColor(19).color};`
            // console.log(this.style)
        },
        methods:{
           
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