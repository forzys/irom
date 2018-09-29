import Axios from './config.js'
import { musicImg } from '../../static/js/index.js';


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
//较慢；响应时间4s左右
//自动机器人 天气、翻译、藏头诗、笑话、歌词、计算、域名信息/备案/收录查询、IP查询、手机号码归属、人工智能聊天。
export function IT120_ROBOT(query){
  return Axios({
    methods:'get',
    url:`/it120/api/transmit/700?key=free&appid=0&msg=${query}`
  }) 
}
//较快；响应时间0.9s左右
//自动机器人 只能聊天
export function IT120_ROBOT2(query){
  return Axios({
    methods:'get',
    url:`/it120/api/transmit/706?search=${query}`
  }) 
}
///////////////////qq专区////////////////////////////////////
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
export function IT120_QQMUSIC_LRC(id,type){
  let g_SongData={
    type:type
  }
  var url = "it120/api/transmit/707?nobase64=1&musicid=" + id + "&callback=jsonp1" + ((g_SongData.songtype == 111 || g_SongData.songtype == 112 || g_SongData.songtype == 113) ? ('&songtype=' + g_SongData.songtype) : '');
  console.log(url)
  let xml=`http://music.qq.com/miniportal/static/lyric/${id%100}/${id}.xml`
  // let url=`http://query.yahooapis.com/v1/public/yql?q=select*from%20x÷ml%20where%20url=${xml}&format=json&diagnostics=true&callback=?`
  let YqlUrl='http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D"'+xml+'"&format=json&diagnostics=true&callback=?'
  console.log(xml)
  return Axios({
    methods:'get',
    url:url
  })
}
// musicImgbase vkey 弃用
// http://c.y.qq.com/base/fcgi-bin/fcg_musicexpress.fcg?json=3&guid=0
// export function IT120_QQMUSIC_VKEY(){
//   return Axios({
//     methods:'get',
//     url:`it120/api/transmit/704?json=3&guid=0&format=json`
//   })
// }

// MUSIC URL
export function IT120_QQMUSIC_URL(songmid="000yB0Dc1mwtra",guid="2763071988"){
  let data={
      data:{
        module:"vkey.GetVkeyServer",
        method:"CgiGetVkey",
        param:{
          guid:guid,
          songmid:[songmid],
          songtype:[0],
          loginflag:1,
          uin:'0',
          platform:'20'
        }
      }
    }
  return Axios({
    methods:'get',
    url:`qq/cgi-bin/musicu.fcg?data=${JSON.stringify(data)}`
  })
}
// qq 获取mv URL
// https://c.y.qq.com/mv/fcgi-bin/getmv_by_tag?cmd=shoubo&lan=all
export function IT120_QQMV_SHOUBO(vids="l0027z1nbe8"){
  let data={
    getMvUrl:{
      module:"gosrf.Stream.MvUrlProxy",
      method:"GetMvUrls",
      param:{
        vids:[vids],
        request_typet:10001
      }
    }
  }
  return Axios({
    methods:'get',
    url:`qq/cgi-bin/musicu.fcg?data=${JSON.stringify(data)}`
  })
}
///////////////////////////////////////////////////////end//////////////////////////
