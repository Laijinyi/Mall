<template>
  <tab-bar>
    <tabbar-item path="/home" isActiveColor='blue'>
      <img slot="tabbar-icon" src="~assets/img/tabbar/home.svg"/><!-- 在dom的src中用别名，必须在前加“~”号 -->
      <img slot="tabar-icon-active" src="~assets/img/tabbar/home_active.svg"/>
      <div slot="tabbar-text">首页</div>
    </tabbar-item>
    <tabbar-item path="/category">
      <img slot="tabbar-icon" src="~assets/img/tabbar/category.svg"/>
      <img slot="tabar-icon-active" src="~assets/img/tabbar/category_active.svg"/>
      <div slot="tabbar-text">分类</div>
    </tabbar-item>
    <tabbar-item path="/shopCart">
      <img slot="tabbar-icon" src="~assets/img/tabbar/shopcart.svg"/>
      <img slot="tabar-icon-active" src="~assets/img/tabbar/shopcart_active.svg"/>
      <div slot="tabbar-text">购物车</div>
    </tabbar-item>
    <tabbar-item path="/profile">
      <img slot="tabbar-icon" src="~assets/img/tabbar/profile.svg"/>
      <img slot="tabar-icon-active" src="~assets/img/tabbar/profile_active.svg"/>
      <div slot="tabbar-text">我的</div>
    </tabbar-item>
  </tab-bar>
</template>

<script>
  import TabBar from '../common/tabbar/TabBar.vue'
  import TabbarItem from '../common/tabbar/TabBarItem.vue'
  export default{
    name:'MainTabbar',
    components:{//为了路径书写方便，可以在build文件夹下的webpack.base.conf中的alias配置别名
      TabBar,
      TabbarItem
    }
  }
</script>

<style>
</style>
