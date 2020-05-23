//处理 日报 的默认值
export function toDate(date){
  return date.toLocaleDateString().split('/').join('-')  //'2019/11/25'  ---> '2019-11-25'
}

//处理 周报 的默认值
export function toWeek(date){
  var a=date.getFullYear();   //当前日期的年份
  var b=date.getMonth()+1;   //当前日期的月份
  var c=date.getDate(); //当前日期的日
  var date1 = new Date(a, parseInt(b) - 1, c);  //date1是当前日期
  var date2 = new Date(a, 0, 1);  //date2是当年第一天
  var d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);  //d是当前日期是今年第多少天
  ////用d + 当前年的第一天的周差距的和在除以7就是本年第几周
  return a+'第'+Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7)+'周'
}

//处理 月报 的默认值
export function toMonth(date){
  return date.getFullYear()+'-'+(date.getMonth()+1)
}

//处理 季报 的默认值
export function toQuarter(date){
  return date.getFullYear()+'第'+Math.ceil((date.getMonth()+1)/3)+'季度'  
}