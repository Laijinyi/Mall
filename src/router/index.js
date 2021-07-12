import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const Category = () => import('../views/category/Category.vue')
const ShopCart = () => import('../views/shopCart/ShopCart.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Detail = () => import('../views/detail/Detail.vue')

//10到13行的代码是解决重复点击路由报重复错误
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

const routes=[
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/shopCart',
    component:ShopCart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path: '/detail/:iid',//通过在路由中传递值
    component:Detail
  }
]
export default new Router({
  routes,
  mode:'history'
})
