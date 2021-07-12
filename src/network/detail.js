import {request} from "./request";

export function getDetailInfo(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

export function getRecommend(){
  return request({
    url:'/recommend'
  })
}

//对于复杂数据，需使用类的构造函数对数据整合并导出该类，用时就可面向该类编程(该类中有所需的全部数据)
export class Goods{
  constructor(itemInfo,columns,services) {
    this.title=itemInfo.title;
    this.desc=itemInfo.desc;
    this.newPrice=itemInfo.newPrice;
    this.oldPrice=itemInfo.oldPrice;
    this.realPrice=itemInfo.lowNowPrice;
    this.disCount=itemInfo.discountDesc;
    this.columns=columns;
    this.services=services;
  }
}

export class Shop{
  constructor(shopInfo) {
    this.logo=shopInfo.shopLogo;
    this.name=shopInfo.name;
    this.fans=shopInfo.cFans;
    this.sells=shopInfo.cSells;
    this.score=shopInfo.score;
    this.goodsCount=shopInfo.cGoods;
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
