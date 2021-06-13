<template>
<Toast v-if='toastData.isShow' :toastmsg='toastData.toastMessage'/>
    <div class="order">
     <div class="order__price">实付金额￥{{totalPrice}}</div>
    <div class="order__btn" @click="()=>handleShowConfirmChange(true)" >提交订单</div>
  </div>
  <div class="mask" v-show='showConfirmMask' @click="()=>handleShowConfirmChange(false)">
    <div class="mask__content">
      <h3 class="mask__content__title">确认要离开收银台?</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div class="mask__content__btn mask__content__btn--cancel"
        @click="()=>confirmOrder(true)">取消订单</div>
        <div class="mask__content__btn mask__content__btn--ensure"
        @click="()=>confirmOrder(false)">确认支付</div>
      </div>
    </div>
  </div>
</template>
<script>
import {ref}  from 'vue'
import {post} from '../../utils/request'
import {useStore} from 'vuex'
import {useRoute,useRouter} from 'vue-router'
import Toast,{useToastEffect} from '../../components/Toast'
import {useComputePriceEffect} from '../shop/Cart.vue'
//下单相关逻辑
const useMakeOrderEffect=(shopId,shopName,unemptyProductList)=>{
  const store=useStore()
  const router=useRouter()
    const confirmOrder=async (isCanceled)=>{
     let url='/api/order'
    const products=[]
     for(let i in unemptyProductList.value){
       const product=unemptyProductList.value[i]
         products.push({id:product._id,num:product.count})
     }
    //  console.log(products)
    try{
      const result=await post(url,{
      addressId:1,
      shopId,
      shopName:shopName.value,
      isCanceled,
      products
    })
    // console.log(result)
      if(result?.code===200){
        store.commit('cleanCartData',{shopId})
      router.push({path:'/orderList'})
    }else{
      // alert('登录失败')
     showToast('支付失败')
    }
    }catch(e){
      console.log(e.message)
      showToast('无法支付')
    }
    
    }
    return {confirmOrder}
}
//蒙层展示相关逻辑
const useConfirmMaskEffect=()=>{
   const showConfirmMask=ref(false)
   const handleShowConfirmChange=(status)=>{
     showConfirmMask.value=status
   }
   return {showConfirmMask,handleShowConfirmChange}
}
export default {
  name:'Order',
  components:{
    Toast
  },
  setup(){
       
      const route=useRoute()
      const shopId=route.params.id
    const   {showToast,toastData}= useToastEffect()
    const {totalPrice,shopName,unemptyProductList}=useComputePriceEffect()
    const {confirmOrder}=useMakeOrderEffect(shopId,shopName,unemptyProductList)
    const {handleShowConfirmChange,showConfirmMask}=useConfirmMaskEffect()
    return {totalPrice,confirmOrder,
    toastData,showToast,showConfirmMask,handleShowConfirmChange}
  }
}

</script>
<style lang='scss' scoped>
    .order{
   position: absolute;
   left: 0;
   right: 0;
   bottom: 0;
   display: flex;
   height: .49rem;
   line-height: .49rem;
   background: #fff;
   &__price{
  flex: 1;
  text-indent: .24rem;
  font-size: .14rem;
  color: #333;
  font-weight: 700;
   }
   &__btn{
    width: .98rem;
    background: #4fb0f9;
    color: #fff;
    text-align: center;
    font-size: .14rem;
   }
 }
 .mask{
   z-index: 1;
   position: absolute;
   left: 0;
   right: 0;
   bottom: 0;
   top: 0;
   background: rgba(0,0,0,.5);
   &__content{
     text-align: center;
     position: relative;
     left: 50%;
     top: 50%;
     transform: translate(-50%,-50%);
     width: 3rem;
     height: 1.56rem;
     border-radius: .04rem;
     background: #fff;
     &__title{
       
       line-height: .26rem;
       padding: .24rem 0 0 0;
       color: #333;
       font-size: .18rem;
     }
     &__desc{
       margin: .08rem 0 0 0;
       font-size: .14rem;
       color: #666;
       
     }
     &__btns{
       display: flex;
       margin: .24rem .58rem;
     }
     &__btn{
       flex: 1;
       line-height: .32rem;
       width: .8rem;
       border-radius: .16rem;
       font-size: .14rem;
       &--cancel{
         margin-right: .12rem;
         color: #4fb0f9;
         border: .01rem solid #4fb0f9;
       }
       &--ensure{
         margin-left: .12rem;
         color: #fff;
         background: #4fb0f9;
       }
     }
   }
 }
</style>