import {ADD_CART_PRODUCT,ADD_PRODUCT_COUNT} from "./mutations_type";
export default {
  [ADD_PRODUCT_COUNT](state,payload){
    payload.count+=1;
  },
  [ADD_CART_PRODUCT](state,payload){
    payload.count=1;
    state.cartProductLists.push(payload);
  }
}
