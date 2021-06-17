<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" class="tab-control-item"
         :class="{active:index==currentIndex}"
         @click="changeIndex(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      currentIndex:0
    }
  },
  methods:{
    changeIndex(index){
      this.currentIndex=index;
    }
  }
}
</script>

<style scoped>
.tab-control{
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 15px;
  background-color: #eeeeee;
  position: sticky;
  top: 44px;
}
.tab-control-item{
  flex: 1;
}
.active{
  color: #ff5777
}
.active span{
  border-bottom: 2px solid #ff5777;
  padding: 5px;
}

</style>
