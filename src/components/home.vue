<template>
    <div>
        <div>
            <TimeLine />

             <transition name="fade">
                 <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
            </transition>
             <transition name="fade">
                 <router-view v-if="!$route.meta.keepAlive"></router-view>
            </transition>

           
        </div>
    </div>
</template>
<script>
import TimeLine from '@/pages/timeLine/index.vue'
import Zhihu from '@/pages/books/zhihu/index.vue'
    export default{
        name:'Home',
        components:{
            TimeLine,
            Zhihu,
        },
        mounted() {
            this.$router.push('/zhihu')
        },
    }
</script>
 <style lang="">
     
 </style>