import Axios from './config.js'


/**
 * 知乎专栏
 * 
 * */
//////////////////////////////////////////////////////
// 最新消息
export function ZHIHULATEST() {
  return Axios({
    methods:'get',
    url:'/zhihu/4/news/latest'
  })
}
// 消息内容获取
export function ZHIHUDETAIL(id) {
  return Axios({
    methods:'get',
    url:`/zhihu/4/news/${id}`
  })
}
// 主题日报列表查看
export function ZHIHUTHEMES(){
  return Axios({
    methods:'get',
    url:`/zhihu/4/themes`
  })
}
// 主题日报内容查看
export function ZHIHUTHEMESLIST(id){
  return Axios({
    methods:'get',
    url:`/zhihu/4/theme/${id}`
  })
}
// 新闻额外信息：输入新闻的ID，获取对应新闻的额外信息，如评论数量，所获的『赞』的数量。
export function ZHIHUEXTRA(id){
  return Axios({
    methods:'get',
    url:`/zhihu/4/story-extra/${id}`
  })
}
//////////////////////////////////////////////////////

/**
 * it120
 * 
*/
//sina天气
export function IT120_WEATHER(){
  return Axios({
    methods:'get',
    url:`/it120/api/transmit/698`
  }) 
}
//sina HotWord
export function IT120_HOTWORD(){
  return Axios({
    methods:'get',
    url:`/it120/api/transmit/697`
  }) 
}
//快递?type=快递公司代号&postid=快递单号
export function IT120_KUAIDI(fac='shunfeng',id){
  return Axios({
    methods:'get',
    url:`/it120/api/transmit/699?type=${fac}&postid=${id}`
  }) 
}
//自动机器人 天气、翻译、藏头诗、笑话、歌词、计算、域名信息/备案/收录查询、IP查询、手机号码归属、人工智能聊天。
export function IT120_ROBOT(query){
  return Axios({
    methods:'get',
    url:`/it120/api/transmit/700?key=free&appid=0&msg=${query}`
  }) 
}
//qq音乐搜索
export function IT120_QQMUSIC_SEARCH(num=10,name){
  console.log(num,name)
  return Axios({
    methods:'get',
    url:`/it120/api/transmit/701?n=${num}&w=${name}&format=json`
  })
}
//qq 新歌
export function IT120_QQMUSIC_NEW(begin=0,num=30){
  return Axios({
    methods:'get',
    url:`it120/api/transmit/702?topid=27&song_begin=${begin}&song_num=${num}`
  })
}
//qq 热歌
export function IT120_QQMUSIC_HOT(begin=0,num=30){
  return Axios({
    methods:'get',
    url:`it120/api/transmit/702?topid=26&song_begin=${begin}&song_num=${num}`
  })
}
//qq 歌词
