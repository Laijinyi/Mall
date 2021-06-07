<template>
  <div id="tabbar">
    <!-- <tabbar-item></tabbar-item>
    <tabbar-item></tabbar-item>
    <tabbar-item></tabbar-item>
    <tabbar-item></tabbar-item> -->
    <slot></slot>
  </div>
</template>

<script>
  import TabbarItem from "./TabBarItem";

  export default{
    name:'TabBar',
    components:{
      TabbarItem
    }
  }
</script>

<style>
  @import url("../../assets/css/base.css");/* 在style中引用其它地方的css文件方式 */
  /* body{公共的css还是抽在一个地方好些
    margin: 0px;
    padding: 0px;
  } */
  #tabbar{
   display: flex;
   background-color: #f6f6f6;
   position: fixed;/* 这个配合下面三个属性才能让该tabbar在下面 */
   left: 0;
   right: 0;
   bottom: 0;
   box-shadow: 0 -2px 1px rgba(100,100,100,0.1);
   height: 55px;
  }

</style>
