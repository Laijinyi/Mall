<template>
    <div class="contentOne" ref="aaa">
      <ul>
<!--        <div @click="DivClick">DIV</div>  div之类的元素在滚动元素中点击事件无效-->
<!--        <button @click="BtnClick">按钮</button>  button则有效-->
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
        <li>我是谁</li>
      </ul>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
  export default{
    name:'Category',
    data(){
      return{
        bs:null//可以不用data中的值接收Bscroll实例的引用
      }
    },
    methods:{
      DivClick(){
        console.log('DivClick');
      },
      BtnClick(){
        console.log('BtnClick');
      }
    },
    mounted() {
      let bs=new BScroll(this.$refs.aaa,{
        probeType:3,
        pullUpLoad:true
      });
      //console.log(bs);
      /*bs.on('scroll',(position)=>{
        console.log(position);
      });*/
      /*bs.on('pullingUp',()=>{
        console.log('上拉加载更多');
      })*/
    }
  }
</script>

<style>
.contentOne{
  height: 200px;
  background-color: orange;
  overflow: hidden;
}
</style>
