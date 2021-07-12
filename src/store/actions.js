import {ADD_CART_PRODUCT,ADD_PRODUCT_COUNT} from "./mutations_type";
export default {
  addToCart(context,payload){//形参固定为context和payload
    //state.cartProductLists.push(payload);//这只是单纯的往数组添加数组，如果添加的商品已经在数组中，就不是添加进，而是其计数+1
    //数组常用方法 push,pop,sort,reverse,shift,unshift,reduce,filter,map,find,join
    let hasProduct=context.state.cartProductLists.find(item=>item.iid===payload.iid);
    if (hasProduct){
      //数组已有该商品，计数+1
      context.commit(ADD_PRODUCT_COUNT,hasProduct)
      //hasProduct.count+=1;转到mutations中的addProductCount里
    }else {
      //数组无该商品，1.添加count属性并将其设置为1 2.push进数组
      context.commit(ADD_CART_PRODUCT,payload);
      /*payload.count=1;//转到mutations中的addCartProduct里
      context.cartProductLists.push(payload);*/
    }
  }
}
