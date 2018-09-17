<template>
  <div class="editor">
    <!-- cdn加载富文本编辑器 -->
    <remote :src="url1"></remote>
    <remote :src="url2"></remote>
    <div id="editor">
      <!-- <p v-show="loading">欢迎</p> -->
    </div>
    <button id="btn1">发送</button>

    <!-- <div id="con"></div> -->
  </div>
</template>
<script>
export default {
  name:'editor',

   components: {
     //远程加载wangEditor
   'remote': {
      render(createElement){
        return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
      },
      props: {
        src: { type: String, required: true },
      },
    },
    //
  },
  data(){
    return{
      url1:'http://unpkg.com/wangeditor/release/wangEditor.min.js',//编辑框cdn地址
      url2:'https://cdn.bootcss.com/js-xss/0.3.3/xss.js',//xss 过滤cdn地址
    }
  },
  mounted() {
    this.init()
  },
  methods:{
    init(){
      // 初始化富文本编辑器

      //存储this指针
      let that=this;
      // window加载完成执行
      window.onload=function(){
        let E = window.wangEditor
        let editor = new E('#editor')
        // editor.customConfig.uploadImgShowBase64 = true// 使用 base64 保存图片,允许打开本地图片
        editor.create()
        //监听点击事件
         document.getElementById('btn1').addEventListener('click', ()=>{
            let html = editor.txt.html()
            let filterHtml = filterXSS(html)  // 此处进行 xss 攻击过滤
            // 显示输入的内容 // document.getElementById('con').innerHTML=filterHtml;
            // that.$emit('output',html)
            that.$emit('output',filterHtml)
        }, false)
      }
    }
  },
  beforeDestroy:{
    //处理
  }
}
// 表情库
// https://api.weibo.com/2/emotions.json?source=1362404091
// http://yuncode.net/code/c_524ba520e58ce30
</script>


