<template>
  <div class="content">
    <div class="category">
      <div :class="{category__item:true,'category__item--active':item.tag===currentTag}" @click="()=>handleTagClick(item.tag)" v-for="item in categorys" :key='item.tgName'>{{item.tagName}}</div>
    </div>
    <div class="product">
      <div class="product__item" v-for='item in contentList' :key='item._id'>
        <img :src="item.imgUrl" alt="" class="product__item__img">
        <div class="product__item__detail">
           <h4 class="product__item__title">{{item.title}}</h4>
           <p class="product__item__sales">{{item.sales}}</p>
           <p class="product__item__price">
             <span class="product__item__yen">&yen;</span>{{item.price}}
             <span class="product__item__origin">&yen;{{item.oldprice}}</span>
           </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus"
           @click="()=>{latest_changeItemToCart(shopId,item._id,item,-1,shopName)}">-</span>
          {{cartList?.[shopId]?.productList?.[item._id]?.count || 0}}
          <span class="product__number__plus"
          @click="()=>{latest_changeItemToCart(shopId,item._id,item,1,shopName)}">+</span>
      </div>
      </div>
  
    </div>
  </div>
</template>
<script>
import {reactive,toRefs,ref,watchEffect} from 'vue'
// import {useStore} from 'vuex'
import {get} from '../../utils/request'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {useCartEffect} from './commonCartHandle'
const categorys=[
     {
       'tagName':'全部商品',
       'tag':'all'
     },
      {
       'tagName':'秒杀',
       'tag':'seckill'
     },
     {
       'tagName':'新鲜水果',
       'tag':'fruits'
     },
     {
       'tagName':'休闲食品',
       'tag':'snacks'
     },
     {
       'tagName':'时令蔬菜',
       'tag':'vegetables'
     },
     {
       'tagName':'肉蛋家禽',
       'tag':'meat_egg_poultry'
     },
    ]
  //负责切换标签的
const useTagEffect=()=>{
   let currentTag=ref(categorys[0].tag)
   const handleTagClick=(tab)=>{
     currentTag.value=tab
   }
   return {currentTag,handleTagClick}
}
  //负责请求标签对应的内容区所需的数据
const useContentEffect=(currentTag,shopId)=>{
  
    const product=reactive({contentList:{}})
     let url=`/api/shop/${shopId}/products`
    const getContentData=async ()=>{

            const res=await get(url,{tag:currentTag.value})
            if(res?.code===200&&res?.data.length){
                  // console.log(res)
                  product.contentList=res.data   
            }     
    }
    //watchEffect当页面首次加载时调用一次，后面的调用根据watchEffect
    //所监听的回调函数中执行的getgetContentData
    //中所以依赖的数据变化来执行，本例中currentTag便是所依赖的数据
    watchEffect(()=>{getContentData()})
    const  {contentList}=toRefs(product)
    return {contentList}
}
//增减购物车商品相关逻辑
// const useCartEffect=()=>{
//   const store=useStore()
//   const {cartList}=toRefs(store.state)
//   const changeItemToCart=(shopId,productId,productInfo,num)=>{
//       // console.log(shopId,productId,productInfo)
//       store.commit('changeItemToCart',{
//         shopId,productId,productInfo,num
//       })

//   }
//   return {cartList,changeItemToCart}
// }

export default {
  name:'Content',
  props:['shopName'],
  setup(){
    const route=useRoute()
    const store=useStore()
    const shopId=route.params.id
     const {currentTag,handleTagClick}  =useTagEffect()
     const   {contentList}=useContentEffect(currentTag,shopId)
     const {cartList,changeItemToCart}=useCartEffect()
     const changeShopName=(shopId,shop_name)=>{
    store.commit('changeShopName',{
      shopId,shop_name
    })
     }
     const latest_changeItemToCart=(shopId,productId,item,num,shop_name)=>{
           changeItemToCart(shopId,productId,item,num)
           changeShopName(shopId,shop_name)
     }
    return {contentList,categorys,handleTagClick,currentTag,
    shopId,cartList,changeItemToCart,latest_changeItemToCart}
  }
}
</script>
<style lang='scss' scoped>
@import '../../style/mixins.scss';
.content{
  left: 0;
  position: absolute;
  right: 0;
  top:1.6rem;
  bottom: .5rem;
  display: flex;
  // background: #ddd;
}
.category{
  overflow-y: scroll;
  width: .76rem;
  height: 100%;
  background: #f5f5f5;
  &__item{
    line-height: .4rem;
    font-size: .14rem;
    text-align: center;
    color: #333;
    &--active{
    background: #fff;

  }
  
  }
  
}
.product{
  flex: 1;
  overflow-y: scroll;
  &__item{
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid #f1f1f1;
    &__img{
    width: .68rem;
    height: .68rem;
    padding-right: .1rem;
  }
  &__detail{
    flex: 1;
    overflow:hidden ;
  }
  &__title{
    margin:0;
    line-height: .2rem;
    font-size: .14rem;
    color:#333;
    @include ellipsis;
  }
  &__sales{
    margin: .06rem 0;
    line-height: .16rem;
    font-size: .12rem;
    color:#333;
  }
  &__price{
    margin: 0;
     line-height: .2rem;
    font-size: .14rem;
    color:#e93b3b;
  }
  &__yen{
    font-size: .12rem;
  }
  &__origin{
    line-height: .2rem;
    font-size: .12rem;
    color: #999;
    text-decoration: line-through;
  }
  .product__number{
    position: absolute;
    right: 0;
    bottom:.12rem;
    font-size: .16rem;
    &__minus,&__plus{
      display: inline-block;
      width: .2rem;
      height: .2rem;
      line-height: .2rem;
      border-radius: 50%;
      text-align: center;
      font-size: .2rem;
    }
    &__plus{
      background: #0091ff;
     margin-left: .05rem;
     color: #fff;
    }
    &__minus{
      border: .01rem solid #666;
      margin-right: .05rem;
      color:#666
    }
  }
  }
}
</style>