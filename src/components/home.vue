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
       <Footer />

       <!-- 全局功能区 -->
       <audio :src="src" autoplay @ended="ended" @pause="loop">
           您的浏览器不支持audio标签播放音频呢
       </audio>
    </div>
</template>
<script>
import Header from './header.vue'
import Footer from './footer.vue'
// import TimeLine from '@/pages/timeLine/index.vue'
import {getTime,getColor} from '@/static/js/index.js'
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
            this.$router.push('/zhihu')
            // console.log(getColor(19));
            // this.style=`background:${getColor(19).color};`
            // console.log(this.style)
        },
        methods:{
            alert(){
                alert('您的浏览器不支持audio')
            },
            ended(){
                console.log('ended')
            }
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
        margin:0 auto;
    }
 </style>