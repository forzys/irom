<template>
    <div>
        <div>
            <TimeLine />
            <Zhihu />
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
        methods:{
           
        }
    }
</script>
 <style lang="">
     
 </style>