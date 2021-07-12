<template>
  <div ref="wrapper" class="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default(){
        return 0
      }
    },
    pullUpLoad:{
      type:Boolean,
      default() {
        return false;
      }
    }
  },
  data(){
    return{
      bs:null
    }
  },
  mounted() {
    //setTimeout(()=>{//由于监听了所有图片加载完成后再重新计算可滚动高度，所以无需延时操作也可以正常滚动
      this.bs = new BScroll(this.$refs.wrapper, {
        click:true,//div之类的元素，不设置为true，点击事件无效
        probeType:this.probeType,//为了适配，所以由使用者决定在哪里需不需要定位。
        pullUpLoad:this.pullUpLoad//为了适配，所以由使用者决定需不需要上拉加载更多
      });
      //console.log(this.bs);
      this.bs&&this.bs.on('scroll',(position)=>{
        //console.log(position);
        this.$emit('scroll',position);
      });
      this.bs&&this.bs.on('pullingUp',()=>{
        this.$emit('pullingUpLoad');
      })
    //},100)//延时设置成100，finishPullUp就不报错了，就离谱
    /*this.bs.on('scroll',(position)=>{
      console.log(position);//由于延时的设置，所以需等到bs接收到BScroll实例后才能使用
    })*/
    //this.$emit('Scroll',)
  },
  methods:{
    backTop(x,y,time=100){
      this.bs.scrollTo(x,y,time);
    },
    refresh(){
      //console.log('---')
      this.bs.refresh();
    },
    finishPullUp(){
      this.bs.finishPullUp();
    }
  }
}
</script>

<style scoped>
.wrapper{
  position: absolute;
  top: 44px;
  bottom: 49px;
  height: 100vh;
  overflow: hidden;
}
</style>
