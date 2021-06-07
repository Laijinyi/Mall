<template>
  <tab-bar>
    <tabbar-item path="/home" isActiveColor='blue'>
      <img slot="tabbar-icon" src="~assets/img/tabbar/home.png"/><!-- 在dom的src中用别名，必须在前加“~”号 -->
      <img slot="tabar-icon-active" src="~assets/img/tabbar/home_active.png"/>
      <div slot="tabbar-text">首页</div>
    </tabbar-item>
    <tabbar-item path="/category">
      <img slot="tabbar-icon" src="~assets/img/tabbar/category.png"/>
      <img slot="tabar-icon-active" src="~assets/img/tabbar/category_active.png"/>
      <div slot="tabbar-text">分类</div>
    </tabbar-item>
    <tabbar-item path="/shopCart">
      <img slot="tabbar-icon" src="~assets/img/tabbar/shopcart.png"/>
      <img slot="tabar-icon-active" src="~assets/img/tabbar/shopcart_active.png"/>
      <div slot="tabbar-text">购物车</div>
    </tabbar-item>
    <tabbar-item path="/profile">
      <img slot="tabbar-icon" src="~assets/img/tabbar/profile.png"/>
      <img slot="tabar-icon-active" src="~assets/img/tabbar/profile_active.png"/>
      <div slot="tabbar-text">我的</div>
    </tabbar-item>
  </tab-bar>
</template>

<script>
  import TabBar from '../common/TabBar.vue'
  import TabbarItem from '../common/TabBarItem.vue'
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
