<template>
<div id="detail">
  <detail-navbar class="detail-navbar" @detailNavbarItemClick="detailNavbarItemClick" ref="detailNavbar"></detail-navbar>
  <scroll :pull-up-load="true" ref="detailScroll" class="content"
             @scroll="detailScroll" :probe-type="3">
    <ul>
      <li v-for="item in $store.state.cartProductLists">{{item}}</li>
    </ul>
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-goods-info :goods="goods"></detail-goods-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-info :detail-info="detailInfo" @DetailInfoImageLoaded="DetailInfoImageLoaded"></detail-info>
      <detail-param-info :param-info="paramsInfo" @paramInfoImageLoaded="paramInfoImageLoaded" ref="detailParam"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="detailComment"></detail-comment-info>
      <goods-list :goods-list="recommendsInfo" ref="detailRecommend"></goods-list>
    </scroll>
  <detail-bottom-bar @addToCar="addToCar"></detail-bottom-bar>
  <back-top @click.native="backToTop" v-show="showOrFalse"></back-top>
</div>
</template>

<script>
import DetailNavbar from "./ChildrenComps/DetailNavbar";
import DetailSwiper from "./ChildrenComps/DetailSwiper";
import DetailGoodsInfo from "./ChildrenComps/DetailGoodsInfo";
import DetailShopInfo from "./ChildrenComps/DetailShopInfo";
import DetailInfo from "./ChildrenComps/DetailInfo";
import DetailParamInfo from "./ChildrenComps/DetailParamInfo";
import DetailCommentInfo from "./ChildrenComps/DetailCommentInfo";
import GoodsList from "../../components/content/GoodsList";
import DetailBottomBar from "./ChildrenComps/DetailBottomBar";
import {getDetailInfo,getRecommend,Goods,Shop,GoodsParam} from "../../network/detail";

import Scroll from "../../components/common/scroll/Scroll";
import {debounce} from "../../common/utilMath";
import {mixins,backTop} from "../../common/mixins";
import BackTop from "../../components/content/backtop/BackTop";
export default {
  name: "Detail",
  components:{
    BackTop,
    DetailNavbar,
    DetailSwiper,
    DetailGoodsInfo,
    DetailShopInfo,
    Scroll,
    DetailInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
  },
  data(){
    return{
      iid:null,
      topImages:[],
      goods:{},
      shopInfo:{},
      detailInfo:{},
      paramsInfo:{},
      commentInfo:{},
      recommendsInfo: [],
      itemImageListener:null,
      detailNavbarItemsY:[],
      getDetailNavbarItemsPosition:null,
      currentIndex:0
    }
  },
  mixins:[mixins,backTop],
  created() {
    //1.获取每个商品的iid并保存
    this.iid=this.$route.params.iid;
    //2.根据iid去请求详情数据,并展示轮播图图片
    getDetailInfo(this.iid).then(res=>{
      console.log(res);
      const data=res.result;
      this.topImages=data.itemInfo.topImages;
      //使用类整合商品杂乱数据，并保存
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services);
      //整合店铺信息并保存
      this.shopInfo=new Shop(data.shopInfo);
      //保存店铺商品详情信息
      this.detailInfo=data.detailInfo;
      //保存商品尺寸等信息
      this.paramsInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule);
      //保存商品评论信息
      if (data.rate.cRate!=0){
        this.commentInfo=data.rate.list[0];
      };
    //详情页推荐商品数据请求并展示
    getRecommend().then(res=>{//推荐商品复用GoodsListItem，而其中会监听图片加载并通过事件总线发射事件，Home.vue中会监听发出的该事件，
      //但此时在详情页时是不需要refresh刷新Home.vue的better-scroll组件的,同时Detail(本组件也许监听图片加载才能防止滚动的bug)
      //所以-->GoodsListItem中解决
      this.recommendsInfo=res.data.list;
    });
      //初始化函数
      this.getDetailNavbarItemsPosition=debounce(()=>{
        this.detailNavbarItemsY=[];
        this.detailNavbarItemsY.push(0);
        this.detailNavbarItemsY.push(this.$refs.detailParam.$el.offsetTop);
        this.detailNavbarItemsY.push(this.$refs.detailComment.$el.offsetTop);
        this.detailNavbarItemsY.push(this.$refs.detailRecommend.$el.offsetTop);
        this.detailNavbarItemsY.push(Number.MAX_VALUE);//多加一个参数，便于滚动到对应高度，选中对应导航栏主题的实现条件判断
        //console.log(this.detailNavbarItemsY)
      },100);
    })
  },
  mounted() {
    /*let refresh=debounce(this.$refs.detailScroll&&this.$refs.detailScroll.refresh,50);
    this.itemImageListener=()=>{
      refresh();
    };
    this.$bus.$on('imageLoaded',this.itemImageListener);*/

    //this.$bus.$on('detailImageLoaded',this.itemImageListener);
  },
  /*deactivated() {//因为该Detail组件不在缓存中，所以调用deactivated无效，而应该在destroy调用
    this.$bus.$off('imageLoaded',this.itemImageListener);
  }*/
  destroyed() {
    this.$bus.$off('imageLoaded',this.itemImageListener);
  },
  methods:{
    DetailInfoImageLoaded(){
      this.newRefresh();
      this.getDetailNavbarItemsPosition();
    },
    paramInfoImageLoaded(){
      this.newRefresh();
    },
    detailNavbarItemClick(index){
      //根据点击详情导航栏中四个参数中的一个，来滚动到对应的位置，需要offsetTop属性
      //console.log(index);
      this.$refs.detailScroll.bs.scrollTo(0,-this.detailNavbarItemsY[index],100);
    },
    detailScroll(position){//根据滚动到的位置来使得详情页导航栏中选中四个参数中对应的那一个取得滚动位置，与detailNavbarItemsY数组中的值
      // 比较来确定导航栏的状态
      //1.根据位置选中导航主题
      let positionY=-position.y;
      let length=this.detailNavbarItemsY.length;
      for (let i = 0; i < this.detailNavbarItemsY.length-1; i++) {//里面的if判断语句过于复杂，精简
        //1.普通写法
        /*if(this.currentIndex!==i&&((i<this.detailNavbarItemsY.length-1)&&positionY>=this.detailNavbarItemsY[i]&&
          positionY<this.detailNavbarItemsY[i+1] ||((i==this.detailNavbarItemsY.length-1)&&(positionY>=this.detailNavbarItemsY[i])))){
          this.currentIndex=i;
          //console.log(i);
          this.$refs.detailNavbar.currentIndex=this.currentIndex;
        }*/
        //2.精简写法
        if ((this.currentIndex!==i)&&(positionY>=this.detailNavbarItemsY[i]&&positionY<this.detailNavbarItemsY[i+1])){
          this.currentIndex=i;
          this.$refs.detailNavbar.currentIndex=this.currentIndex;
        }
      }
      //2.根据位置，是否显示回到顶部按钮
      this.showOrFalse=-position.y>1000;
    },
    isShowBackTop(position){
      //1.监听是否显示回到顶部控件
      //console.log(position)
      this.showOrFalse=-position.y>1000;
      //2.监听是否显示作为吸顶效果的tabControl组件
      this.tabControlIsShow=-position.y>538
    },
    addToCar(){
      //1.保存要添加到购物车的商品信息
      console.log('---')
      let product={};
      product.img=this.topImages[0];
      product.title=this.goods.title;
      product.desc=this.goods.desc;
      product.realPrice=this.goods.realPrice;
      product.iid=this.iid;

      //使用VueX来管理该商品信息(Detail组件和Cart组件之间无直接关系，但又有从Detail组件-->Cart组件的数据关系)
      //this.$store.state.cartProductLists.push(product);//不要直接修改state的值，应该通过mutations或action是来修改state
      //this.$store.commit('addToCart',product);//前一个参数为mutations的方法名，后一个是需传入的值且不要带引号
      this.$store.dispatch('addToCart',product)//使用actions时用dispatch,参数与mutations一致
    }
  }
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  height: 100vh;
}
.content{
  height: calc(100% - 44px - 49px);
}
</style>
