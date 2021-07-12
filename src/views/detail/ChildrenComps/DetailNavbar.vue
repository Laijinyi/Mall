<template>
  <nav-bar>
    <div slot="left" class="backImage" @click="detailNavBarBack">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="detailNavbar">
      <span v-for="(item,index) in NavBarInfo" class="detailNavbarItem"
            @click="detailNavbarItemClick(index)"
            :class="{isActive:index===currentIndex}">{{item}}</span>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "../../../components/common/navbar/NavBar";
export default {
  name: "DetailNavbar",
  components: {NavBar},
  data(){
    return{
      NavBarInfo:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    detailNavbarItemClick(index){//监听点击
      //1.将当前索引修改为点击的索引
      this.currentIndex=index;
      //2.发射事件告诉父组件点击了哪个，以便实现点击滚动的效果
      this.$emit('detailNavbarItemClick',index);
    },
    detailNavBarBack(){
      //this.$router.push('/home')//这个也可以返回
      this.$router.back();//back()返回
    },
  }
}
</script>

<style scoped>
.detailNavbar{
  display: flex;
  font-size: 14px;
}
.detailNavbar .detailNavbarItem{
  flex: 1;
}
.isActive{
  color: #ff5777;
}
.backImage{
  text-align: center;
  margin-top: 6px;
}
</style>
