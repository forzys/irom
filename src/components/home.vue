<template>
    <div>
        <editor @output="output" />

        <div id="con">

        </div>
    </div>
</template>
<script>
import editor from '@/components/editor/'
    export default{
        name:'Home',
        components:{
            editor,
        },
        methods:{
            output(con){
                document.getElementById('con').innerHTML=con
            }
        }
    }
</script>
 <style lang="">
     
 </style>