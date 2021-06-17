import axios from "axios";
export  function request(config) {
  const instance=axios.create({
    baseURL:"http://123.207.32.32:8000",
    timeout:5000
  })
  instance.interceptors.request.use(config=>{//请求拦截
    return config;//拦截了就要返回，否则请求失败
  },err=>{

  })
  instance.interceptors.response.use(result=>{
    return result.data//拦截了就要返回，否则拿不到结果
  },err=>{

  })
  return instance(config);
}
