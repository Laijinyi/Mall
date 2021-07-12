<template>
  <div class="goods-list-item" @click="goodsItemClick">
    <img :src="showImage" @load="imageLoad"/>
    <div class="goods-info">
      <p>{{goodsListItem.title}}</p>
      <span>{{goodsListItem.price}}</span>
      <span>{{goodsListItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props:{
    goodsListItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    showImage(){//计算属性使用不用带括号
      return this.goodsListItem.image||this.goodsListItem.show.img;
    }
  },
  methods:{
    imageLoad(){
      //1、一个是通过路由，比较路径来决定通过事件总线发射发射两个不同的事件
      /*if(this.$route.path.indexOf('/home')){
        this.$bus.$emit('homeImageLoaded')
      }else if(this.$route.path.indexOf('/detail')){
        this.$bus.$emit('detailImageLoaded')
      }*/
      //2、只通过事件总线发出一个事件，由Home和Detail组件两个在其组件不活跃(deactivated)时，取消该事件
      this.$bus.$emit('imageLoaded')
    },
    goodsItemClick(){
      this.$router.push('/detail/'+this.goodsListItem.iid)//使用route中index.js中配置的路由用path中“:”带参，用此方式传参
    }
  }
}
</script>

<style scoped>

.goods-list-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%;
}

.goods-list-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
