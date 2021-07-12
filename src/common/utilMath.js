export function debounce(func,delay){//防抖方法，防止scroll的refresh方法执行频率过高
  let timer=null;
  return function (...args){
    if (timer){
      clearTimeout(timer);
    }
    timer=setTimeout(()=>{
      func.apply(this,args);
    },delay)
  }
}

export function formatDate(date, fmt) {//时间戳转常用日期格式
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
function padLeftZero (str) {//左边添0函数，挺巧妙的
  return ('00' + str).substr(str.length);
};
