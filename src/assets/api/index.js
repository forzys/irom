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
