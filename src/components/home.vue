<template>
    <div>
        <div>
            <TimeLine />
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
                <router-view v-if="!$route.meta.keepAlive"></router-view>
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