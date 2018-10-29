import {
  hex_hmac_sha1
} from './sha1.js'

export const getTime=()=>{
  let time=new Date(),
  year=time.getFullYear(),
  month=time.getMonth()+1,
  date=time.getDate(),
  hours=time.getHours(),
  minutes=time.getMinutes(),
  seconds=time.getSeconds()

  return {
      year:year,
      month:month,
      date:date,
      hours:hours,
      minutes:minutes,
      seconds:seconds,
  };
}

export const getColor=(time=0)=>{

  let color=['#b4a078','#be4141','#333333']
  let i=Math.ceil(time/parseInt(24/color.length))

  return {
    color:color[i-1],
    all:color
  }
}
//快递拼音
export const getExpress=()=>{
  return{
    申通:"shentong",
    EMS:"ems",
    顺丰:"shunfeng",
    圆通:"yuantong",
    中通:"zhongtong",
    韵达:"yunda",
    天天:"tiantian",
    汇通:"huitongkuaidi",
    全峰:"quanfengkuaidi",
    德邦:"debangwuliu",
    宅急送:"zhaijisong",
  }
}

export const musicUrl = (songmid) => {
  let url = `http://ws.stream.qqmusic.qq.com/C100${songmid}.m4a?fromtag=0&guid=0`
  console.log('歌曲播放地址',url)
  return url
}

export const musicImg = (imgId,width=300) => {
  let url = `http://imgcache.qq.com/music/photo/album_${width}/${imgId%100}/${width}_albumpic_${imgId}_0.jpg`
  return url
}

export const musicPlay =()=>{
  
}








