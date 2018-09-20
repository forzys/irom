import Axios from './config.js'


export function ZHIHULATEST() {
  return Axios({
    methods:'get',
    url:'/zhihu/4/news/latest'
  })
}

export function ZHIHUDETAIL(id) {
  return Axios({
    methods:'get',
    url:`/zhihu/4/news/${id}`
  })
}

export function ZHIHUTHEMES(){
  return Axios({
    methods:'get',
    url:`/zhihu/4/themes`
  })
}
