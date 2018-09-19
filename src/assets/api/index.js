import Axios from './config.js'


export function ZHIHULATEST() {

  return Axios({
    methods:'get',
    url:'/zhihu/4/news/latest'
  })
  
}