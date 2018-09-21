

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



