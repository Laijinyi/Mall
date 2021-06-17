<template>
  <div id="home">
    <nav-bar class="home-nav"><slot slot="center">购物广场</slot></nav-bar>
    <home-swiper :banners="banner"></home-swiper>
    <home-recommond :recommends="recommend"></home-recommond>
    <home-feature></home-feature>
    <tab-control class="tab-control" :titles="['流行','新款','精选']"></tab-control>
    <ul>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </ul>
  </div>
</template>

<script>
import HomeSwiper from "./homeChildren/HomeSwiper";
import HomeRecommond from "./homeChildren/HomeRecommond";
import HomeFeature from "./homeChildren/HomeFeature";

import NavBar from "../../components/common/navbar/NavBar";
import TabControl from "../../components/content/TabControl";

import {getHomeMultiData} from "../../network/home";

export default{
  name:'Home',
  components: {
    HomeSwiper,
    HomeRecommond,
    HomeFeature,
    NavBar,
    TabControl,
  },
  data(){
    return{
      banner:[],
      dKeyword:[],
      keywords:[],
      recommend:[],
    }
  },
  created() {
    getHomeMultiData().then(res=>{
      console.log(res)
      this.banner=res.data.banner.list;
      this.dKeyword=res.data.dKeyword.list;
      this.keywords=res.data.keywords.list;
      this.recommend=res.data.recommend.list;
    })
  }
}
</script>

<style>
#home{
  padding-top: 44px;
}
.home-nav{
  text-align: center;
  color: #f6f6f6;
  background-color: #ff5777;
  box-shadow: 0 -2px 1px rgba(100,100,100,0.1);

  position: fixed;
  z-index: 9;
  left: 0;
  top: 0;
  right: 0;
}
</style>
