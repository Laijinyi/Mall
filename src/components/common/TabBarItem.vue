<template>
  <div class="tabbar-item" @click="getActive">
    <!-- <img src="../../assets/img/tabbar/home.png">
    <div>首页</div> -->
    <div v-if="isActive"><slot name="tabbar-icon"></slot></div>
    <div v-else><slot name="tabar-icon-active"></slot></div>
    <div :style="activeColor"><slot name="tabbar-text"></slot></div><!-- 最好是在slot最外层套一层div，
    某些属性就可以写在外层div中而不会混淆 -->
    </div>
</template>

<script>
  export default{
    name:'TabbarItem',
    props:{
      path:String,
      isActiveColor:{
        type:String,
        default:'red'
      }
    },
    data(){
      return{
        /* isActive:false */
      }
    },
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path)===-1
      },
      activeColor(){
        return this.isActive?{}:{color:this.isActiveColor}
      }
    },
    methods:{
      getActive(){
        this.$router.push(this.path)
      }
    }
  }
</script>

<style>
  .tabbar-item{
    flex: 1;/* 均等分 */
    text-align: center;
    font-size: 14px;
  }
  .tabbar-item img{
    width: 30px;
    height: 30px;
    vertical-align: middle;
    margin-top: 4px;
  }
  /* .active{
    color: red;
  } */
</style>
