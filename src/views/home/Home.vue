<template>
  <div id="home">
    <nav-bar class="home-nav"><slot slot="center">购物广场</slot></nav-bar>
    <tab-control class="tab-control" :titles="['流行','新款','精选']"
                 @tabControl="changeGoodsList"
                 ref="tabControl1" v-show="tabControlIsShow"></tab-control>
    <better-scroll ref="betterScroll" :probe-type="3" @scroll="isShowBackTop"
                   :pull-up-load="true"
                   @pullingUpLoad="LoadMoreData">
        <home-swiper :banners="banner" @swiperImageLoaded="swiperImageLoaded"></home-swiper>
        <home-recommond :recommends="recommend"></home-recommond>
        <home-feature></home-feature>
        <tab-control class="tab-control" :titles="['流行','新款','精选']"
                     @tabControl="changeGoodsList"
                     ref="tabControl2"></tab-control>
        <!-- 监听发射的事件的参数时默认的   -->
        <goods-list :goodsList="goods[currentGoodName].list"></goods-list>
    </better-scroll>
    <back-top @click.native="backToTop" v-show="showOrFalse"></back-top><!--  也可以这样:class="{isShow:showOrFalse}"  -->
  </div>
</template>

<script>
import HomeSwiper from "./homeChildren/HomeSwiper";
import HomeRecommond from "./homeChildren/HomeRecommond";
import HomeFeature from "./homeChildren/HomeFeature";
import GoodsList from "../../components/content/GoodsList";
import BackTop from "../../components/content/backtop/BackTop";

import NavBar from "../../components/common/navbar/NavBar";
import TabControl from "../../components/content/TabControl";
import BetterScroll from "../../components/common/scroll/Scroll";

import {getHomeMultiData,getGoodsData} from "../../network/home";
import {mixins,backTop} from "../../common/mixins";
import {debounce} from "../../common/utilMath";

export default{
  name:'Home',
  components: {
    HomeSwiper,
    HomeRecommond,
    HomeFeature,
    NavBar,
    TabControl,
    GoodsList,
    BetterScroll,
  },
  data(){
    return{
      banner:[],
      dKeyword:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentGoodName:'pop',
      keywords:[],
      recommend:[],
      tabControlOffsetTop:0,
      tabControlIsShow:false,
      scrollY:0,
      itemImageListener:null
    }
  },
  mixins:[mixins,backTop],
  created() {
    this.getHomeMultiData();
    this.getGoodsData('pop');
    this.getGoodsData('new');
    this.getGoodsData('sell');
  },
  mounted() {
    //1.图片加载完成监听滚动
    /*let refresh=debounce(this.$refs.betterScroll&&this.$refs.betterScroll.refresh,50);
    this.itemImageListener=()=>{
      refresh();
    };
    this.$bus.$on('imageLoaded',this.itemImageListener)*/
    //2.取得tabControl的offsetTop值(但组件没有offsetTop值)
    //console.log(this.$refs.tabControl.offsetTop);//undefined
    //console.log(this.$refs.tabControl.$el.offsetTop)//这样打印的值太小又不准确，是由于图片还未加载时计算的
  },
  activated() {//activated和deactivated这两个方法在此处可用，且用于记录离开home页面时的位置和回到home页面时滚动的多少
    this.$refs.betterScroll.bs.scrollTo(0,this.scrollY,0);//scrollTo方法无效是由于版本better-scroll版本问题，安装1.13.2解决
    //可能是最新版的滚动到某个位置的方法名不再是scrollTo了，又或者参数改变了
    this.$refs.betterScroll.refresh();//最好重新刷新better-scroll，防止意外
    //console.log(this.scrollY);
  },
  deactivated() {
    //1、记录离开时的位置(y值)信息
    this.scrollY=this.$refs.betterScroll?this.$refs.betterScroll.bs.y:0;
    //console.log(this.scrollY);
    //2、取消事件GoodsListItem通过事件总线发出的事件，必需有两个参数，一个是事件，另一个是需被取消的函数，取消的是mounted中的函数
    this.$bus.$off('imageLoaded',this.itemImageListener);
  },
  methods:{
    /*
    * 事件监听的方法
    * */
    changeGoodsList(index){
      switch (index) {
        case 0:
          this.currentGoodName='pop';
          break;
        case 1:
          this.currentGoodName='new';
          break;
        case 2:
          this.currentGoodName='sell';
          break;
      }
      this.$refs.tabControl2.currentIndex=index;//这两行代码可以保证两个tabControl的选中效果一致
      this.$refs.tabControl1.currentIndex=index;
      //console.log(index);
    },
    isShowBackTop(position){
      //1.监听是否显示回到顶部控件
      //console.log(position)
      this.showOrFalse=-position.y>1000;
      //2.监听是否显示作为吸顶效果的tabControl组件
      this.tabControlIsShow=-position.y>538
    },
    LoadMoreData(){
      this.getGoodsData(this.currentGoodName);
      this.$refs.betterScroll.bs.refresh();
    },
    swiperImageLoaded(){
      this.tabControlOffsetTop=this.$refs.tabControl2.$el.offsetTop;
    },
    /*
    * 网络请求的方法
    * */
    getHomeMultiData(){
      getHomeMultiData().then(res=>{
        this.banner=res.data.banner.list;
        this.dKeyword=res.data.dKeyword.list;
        this.keywords=res.data.keywords.list;
        this.recommend=res.data.recommend.list;
      })
    },
    getGoodsData(type){
      let page=this.goods[type].page+1;
      getGoodsData(type,page).then(res=>{
        let results=res.data.list;
        this.goods[type].list.push(...results);
        this.goods[type].page=page;
        this.$refs.betterScroll.finishPullUp();
      })
    }
  }
}
</script>

<style>
#home{
  /*padding-top: 44px;*/
}
.home-nav{
  text-align: center;
  color: #f6f6f6;
  background-color: #ff5777;
  box-shadow: 0 -2px 1px rgba(100,100,100,0.1);

  /*下面这个是使用原生js实现滚动时需设置的css，用bette-scroll时可以不用*/
  /*position: fixed;
  z-index: 9;
  left: 0;
  top: 0;
  right: 0;*/
}
/*.isShow{!*用v-bind绑定class可行*!
  visibility: hidden;
}*/
</style>
