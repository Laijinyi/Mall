import Vue from "vue";
import Vuex from 'vuex'
import mutations from "./mutations";
import actions from "./actions";
//1.注册插件
Vue.use(Vuex)

//2.创建Store对象
const state={
  cartProductLists:[],//数组中保存一个个商品对象
}
const store=new Vuex.Store({//对每个属性进行了抽取，封装到单独的index文件中
  state,
  mutations,
  actions,
})

//导出Store对象，并挂载在Vue实例中
export default store
