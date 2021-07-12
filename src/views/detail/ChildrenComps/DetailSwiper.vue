<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages" >
      <img :src="item" alt="" @load="detailImageLoad">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "../../../components/common/swiper/index.js"
export default {
  name: "DetailSwiper",
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    detailImageLoad(){
      let flag=true;
      if (flag){
        this.$bus.$emit('detailImageLoaded');
        flag=false;
      }
    }
  }

}
</script>

<style scoped>
.detail-swiper {
  top: 0px;
  height: 300px;
}
</style>
