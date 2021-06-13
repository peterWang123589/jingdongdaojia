<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item,index) in list" :key='index'>
        <div class="order__title">{{item.shopName}}<span class="order__status">
          {{item.isCanceled? '已取消':"已下单"
          }}</span></div>
        <div class="order__content">
          <div class="order__content__imgs">
          <img  v-for='(i,idx) in item.products' :key='idx'
           :src="i.product.img" alt="" class="order__content__img">
          
          </div>
          <div class="order__content__info">
             <div class="order__content__price">￥{{item.totalPrice}}</div>
             <div class="order__content__count">共{{item.totalNum}}件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex='2'/>
</template>
<script>
import Docker from '../../components/Docker.vue'
import {get} from '../../utils/request'
import {reactive,toRefs} from 'vue'
const useOrderListEffect=()=>{
  const data=reactive({list:[]})
      let url='/api/order'
    const getOrderList=async ()=>{
        const result=await get(url)
        if(result?.code===200&&result?.data?.length){
            // console.log(result.data)
          const orderList=result.data
          orderList.forEach(order=>{
            const products=order.products || []
            let totalPrice=0
            let totalNum=0
            products.forEach(product=>{
              totalPrice+=((product?.product?.price * product?.orderSales) || 0)
              totalNum+=(product?.orderSales || 0)
            })
            order.totalPrice=totalPrice
            order.totalNum=totalNum
          })
          data.list=orderList
        }
    }
     getOrderList()
     
     const {list}=toRefs(data)
     console.log(list)
     return {list}
}
export default {
  name:'orderList',
  components:{
   Docker
  },
  setup(){
    const {list}=useOrderListEffect()
    console.log(list)
    return {list}
  }
}
</script>
<style lang='scss' scoped>
.wrapper{
    overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: .5rem;
  background: #eee;
  // padding: 0 .18rem .1rem .18rem;
}
.title{
  line-height: .44rem;
  background: #fff;
  font-size: .16rem;
  color: #333;
  text-align: center;
}
.orders{

}
.order{
  margin-top: .16rem .18rem;
  padding:.16rem ;
  background: #fff;
  &__title{
    font-size: .16rem;
    color: #333;
    line-height: .22rem;
    margin-bottom: .16rem;
  }
  &__status{
    float: right;
    font-size: .14rem;
    color: #999;
  }
  &__content{
    display: flex;
    &__imgs{
      flex: 1;
    }
    &__img{
      width: .4rem;
      height: .4rem;
      margin-right: .12rem;
    }
    &__info{
      width: .7rem;
    }
    &__price{
      line-height: .2rem;
      font-size: .14rem;
      color: #e93b3b;
      text-align: right;
    }
    &__count{
      line-height: .14rem;
      font-size: .12rem;
      color:#333 ;
      text-align: right;
      margin: .08rem 0 0 0;
    }
  }
}
</style>