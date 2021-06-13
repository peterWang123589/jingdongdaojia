<template>
    <div class="products">
    <div class="products__title">{{shopName}}</div>
    <div class="products__wrapper">
     <div class="products__list">
     <template v-for="item in productList" :key='item._id'>
     <div class="products__item"  v-if='item.count>0' >
        <img :src="item.imgUrl" alt="" class="products__item__img">
        <div class="products__item__detail">
           <h4 class="products__item__title">{{item.title}}</h4>
           
           <p class="products__item__price">
             <span >
              <span class="products__item__yen">&yen;</span>
              {{item.price}} x {{item.count}}
             </span>
             <span class="products__item__total">
               <span class="products__item__yen">&yen;</span>
               {{item.price * item.count}}
             </span>
              
           </p>
        </div>
      </div>
      </template>
     </div>
    </div>
  </div>
</template>
<script>
import {useComputePriceEffect} from '../shop/Cart.vue'
export default {
  name:'ProductiList',
  setup(){

    const {productList,shopName}=useComputePriceEffect()
    return {productList,shopName}
  }
}
</script>
<style lang='scss' scoped>
@import '../../style/mixins.scss';
.products{
   margin: .16rem .18rem .1rem .18rem;
   background-color: #fff;
   &__title{
    padding: .16rem;
    font-size: .16rem;
    color: #333;

   }
   &__wrapper{
     overflow-y: scroll;
     position: absolute;
     left: 0;
     right: 0;
     bottom: .6rem;
     top: 2.6rem;
    margin:0 .18rem ;
   }
   &__list{

    background: #fff;
   }

  &__item{
    position: relative;
    display: flex;
    padding:0 .16rem .16rem .16rem ;
    &__img{
    width: .46rem;
    height: .46rem;
    padding-right: .1rem;
  }
  &__detail{
    flex: 1;
 
  }
  &__title{
    margin:0;
    line-height: .2rem;
    font-size: .14rem;
    color:#333;
    @include ellipsis;
  }

  &__price{
    display: flex;
    margin: .06rem 0 0 0;
     line-height: .2rem;
    font-size: .14rem;
    color:#e93b3b;
  }
 
  &__total{
    text-align: right;
    flex: 1;
  }
  &__yen{
    font-size: .12rem;
  }
  

  }
   
 }
</style>