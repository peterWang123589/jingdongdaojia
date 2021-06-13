<template>
<div class="mask"  v-if="isShow && total>0" @click="changeShowCartMenu"></div>
   <div class="cart">
     <div class="product" v-if="isShow && total>0">
       <div class="product__header">
         <div class="product__header__all">
           <span class="product__header__icon logo"
           v-html="allChecked ? '&#xe603;':'&#xe604;'"
           @click="()=>setAllChecked(shopId)"></span>
           全选</div>
         <div class="product__header__clear">
           <span  @click="()=>cleanAllProducts(shopId)">清空购物车</span>
           </div>
       </div>
       <template v-for='item in productList' :key='item._id' >
      <div class="product__item"  v-if='item.count>0'>
        <div class="product__item__checked logo" 
        v-html="item.checked? '&#xe603;' :'&#xe604;'"
        @click="()=>changeItemChecked(shopId,item._id)">   
        </div>
        <img :src="item.imgUrl" alt="" class="product__item__img">
        <div class="product__item__detail">
           <h4 class="product__item__title">{{item.title}}</h4>
           
           <p class="product__item__price">
             <span class="product__item__yen">&yen;</span>{{item.price}}
             <span class="product__item__origin">&yen;{{item.oldprice}}</span>
           </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus"
           @click="()=>{changeItemToCart(shopId,item._id,item,-1)}">-</span>
          {{item.count || 0}}
          <span class="product__number__plus"
          @click="()=>{changeItemToCart(shopId,item._id,item,1)}">+</span>
      </div>
      </div>
    </template>
    </div>
     <div class="check">
       <div class="check__icon">
         <img src="http://www.dell-lee.com/imgs/vue3/basket.png" alt="" 
         class="check__icon__img" @click="changeShowCartMenu">
         <div class="check__icon__badge">{{total}}</div>
       </div>
       <div class="check__info">
         总计:<span class="check__info__price">&yen;{{totalPrice}}</span>
       </div>
       <div class="check__btn">
         <router-link :to="{path:`/orderConfirmation/${shopId}`}">
           去结算
         </router-link>
         
       </div>
     </div>
   </div>
</template>
<script>
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {computed,ref} from 'vue'
import {useCartEffect} from './commonCartHandle'
export const useComputePriceEffect=()=>{
    const route=useRoute()
    const shopId=route.params.id
    const store =useStore()
    const cartList=store.state.cartList
    // console.log(cartList,shopId,cartList[shopId])
   const total =computed(()=>{
     let count =0 
     const shop_info=cartList[shopId]?.['productList']
    //  console.log(cartList[shopId]['productList'])
        if(shop_info){
        for(let i in shop_info){
          count+=shop_info[i]['count']
        }

        }
        return count
   })
    const totalPrice=computed(()=>{
      const shop_info=cartList[shopId]?.['productList']
      let price=0
      if(shop_info){
        for(let i in shop_info){
          if(shop_info[i].checked){
        price+=shop_info[i]['count'] * shop_info[i]['price']
          }
           
        }
      }
      return price.toFixed(2)
  })
  const productList=computed(()=>{
    const productList=cartList[shopId]?.['productList'] || {}
    return productList
  })
  const unemptyProductList=computed(()=>{
    //productList的computed的升级版，只记录数量大于0的商品
    const productList=cartList[shopId]?.['productList'] || {}
    const unemptyProductList={}
    for(let i in productList){
      const product=productList[i]
      if(product.count>0){
        unemptyProductList[i]=product
      }
    }
    return unemptyProductList
  })
  const shopName=computed(()=>{
     const shopName=cartList[shopId]?.['shop_name'] || ''
     return shopName
  })
  const changeItemChecked=(shopId,productId)=>{
    store.commit('changeItemChecked',{
        shopId,productId
      })
  }
  const cleanAllProducts=(shopId)=>{
      store.commit('cleanAllProducts',{
        shopId
      })
  }
  const allChecked=computed(()=>{
     const productList=cartList[shopId]?.['productList']
     let allChecked=true
     for(let i in productList){
       if(productList[i]['count']>0 && !productList[i]['checked']){
           allChecked=false
       }
     }
     return allChecked
  })
  const setAllChecked=(shopId)=>{
      store.commit('setAllChecked',{
        shopId
      })
  }
  return {total,totalPrice,productList,shopId,
  changeItemChecked,cleanAllProducts,allChecked,
  setAllChecked,shopName,unemptyProductList}
}
export default {
  name:'Cart',
  setup(){
    const isShow=ref(false)
    const changeShowCartMenu=()=>{
       isShow.value=!isShow.value
    }
  const {total,totalPrice,productList,shopId,
  changeItemChecked,cleanAllProducts,allChecked,setAllChecked}=useComputePriceEffect()
  const {changeItemToCart}=useCartEffect()
   return {total,totalPrice,productList,changeItemToCart,shopId,
   changeItemChecked,cleanAllProducts,allChecked,setAllChecked,
   isShow,changeShowCartMenu}
  }
 
}
</script>
<style lang='scss' scoped>
@import '../../style/mixins.scss';
.mask{
  position: fixed;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,.5);
  top: 0;
  bottom: 0;
  z-index: 1;
}
.cart{
  position: absolute;
   z-index: 2;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
.product{
  flex: 1;
  overflow-y: scroll;

  &__header{
    display: flex;
    line-height: .52rem;
    border-bottom: .01rem solid #f1f1f1;
    &__all{
      width: .64rem;
      margin-left: .16rem;
      font-size: .18rem;
     
    }
     &__icon{
       font-size: .2rem;
       color:#2980b9 ;
      }
    &__clear{
      flex: 1;
      text-align: right;
      margin-right:.16rem ;
      font-size: .14rem;
      color: #333;
    }
  }
  &__item{
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid #f1f1f1;
    &__checked{
    font-size: .2rem;
    line-height: .68rem;
    height: .68rem;
    margin-right: .2rem;
    color: #2980b9;
    }
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
    margin:.05rem 0 0 0;
    line-height: .2rem;
    font-size: .14rem;
    color:#333;
    @include ellipsis;
  }
 
  &__price{
    margin: .15rem 0 0 0;
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

}
.check{
  height: .49rem;
  border-top: .01rem solid #f1f1f1;
  display: flex;
   line-height: .49rem;
  &__icon{
    width: .84rem;
    position: relative;
    &__img{
      display: block;
      margin: .12rem auto ;
      width: .28rem;
      height: .26rem;
    


    }
    &__badge{
  position: absolute;
  left: .5rem;
  top: .04rem;
 min-width: .2rem;
  height: .2rem;
  line-height: .2rem;
      border-radius: .05rem;
      background-color: #e93b3b;
      font-size:.12rem ;
      text-align: center;
      color: #fff;
      transform: scale(.5);
      transform-origin: left center;
    }
  }
  &__info{
    flex: 1;
          color: #333;
      font-size: .12rem;
    &__price{
  color: #e93b3b;
  font-size: .18rem;
    }
  }
  &__btn{
    width: .98rem;
   
    background-color: #4fb0f9;
    text-align: center;
    color: #fff;
    font-size: .14rem;
    a {
      color: #fff;
      text-decoration: none;
    }
  }
}
</style>