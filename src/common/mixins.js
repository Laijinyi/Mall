import {debounce} from "./utilMath";
import BackTop from "../components/content/backtop/BackTop";
export let mixins={//混入用于两个组件对象具有相同的代码时去组织，减少代码的重写
  data(){
    return{
      newRefresh:null,
    }
  },
  mounted(){//与组件的选项相关，对应组件的选项
     this.newRefresh=debounce((this.$refs.detailScroll&&this.$refs.detailScroll.refresh)||
      (this.$refs.betterScroll&&this.$refs.betterScroll.refresh),100);
    this.itemImageListener=()=>{
      this.newRefresh();
    };
    this.$bus.$on('imageLoaded',this.itemImageListener);
  }
}

export let backTop={
  data(){
    return{
      showOrFalse:false,
    }
  },
  components:{
    BackTop
  },
  methods:{
    backToTop(){
      //this.$refs.betterScroll.bs.scrollTo(0,0,100);
      (this.$refs.betterScroll||this.$refs.detailScroll).backTop(0,0,250);//或这样去Scroll组件中调用方法
    },
  }

}
