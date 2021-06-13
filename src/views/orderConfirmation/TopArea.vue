<template>
      <div class="top">
    <div class="top__bgcolor"></div>
    <div class="top__header">
       <div class="logo top__header__back" @click='handleBack'>&#xe64a;</div>
       确认订单
    </div>
    <div class="top__receiver">
      <div class="top__receiver__title">收货地址</div>
      <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
      <div class="top__receiver__info">
        <span class="top__receiver__info__name">瑶妹 (先生)</span>
        <span class="top__receiver__info__name">18911024266</span>
      </div>
       <div class="logo top__receiver__enter">&#xe64a;</div>
    </div>
     
  </div>
</template>
<script>
import {useRouter} from 'vue-router'
export default {
  name:'TopArea',
  setup(){
    const router=useRouter()
    const handleBack=()=>{
      router.back()
    }

    return {handleBack}
  }
}
</script>
<style lang='scss' scoped>
 .top{
   position: relative;
    height: 1.96rem;
    background-size: 100% 1.59rem;
    background-image: linear-gradient(0deg,rgba(0,145,255,0) 4%,#0091ff 50%);
    background-repeat: no-repeat;
    &__header{
      padding-top: .26rem;
    line-height: .24rem;
    color: #fff;
    text-align: center;
    position: relative;
    font-size: .16rem;
    &__back{
      position: absolute;
      left: .18rem;
      font-size: .22rem;
    }
    }
    &__receiver{
      position: absolute;
      left: .18rem;
      right: .18rem;
     bottom: 0;
     height: 1.11rem;
     background-color: #fff;
     border-radius: .04rem;
     &__title{
       padding: .16rem 0 .14rem .16rem;
       line-height: .22rem;
       font-size: .16rem;
       color: #333;
       
     }
     &__address{
       padding: 0 .4rem 0 .16rem;
       font-size: .14rem;
       color: #333;
     }
     &__info{
       padding: .06rem 0 0 .16rem;
       &__name{
         margin-right:.06rem ;
         line-height: .18rem;
         font-size: .12rem;
         color: #666;
       }
      
     }
      &__enter{
         position: absolute;
         right: .16rem;
         top: .5rem;
         color: #666;
         font-size: .16rem;
         transform: rotate(180deg);
       }
    }
 }
</style>