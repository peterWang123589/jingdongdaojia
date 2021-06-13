<template>
  <div class="nearby__item" >
    <img class="nearby__item__img" :src="item.imgUrl" alt="" >
    <div class="nearby__content">
      <div class="nearby__content__title" >{{item.title}}</div>
      <div class="nearby__content__tags" >
        <span class="nearby__content__tag" >月售{{item.sales}}</span>
        <span class="nearby__content__tag" >起送费￥{{item.expressLimit}}</span>
        <span class="nearby__content__tag" >基础运费￥{{item.expressPrice}}</span>
      </div>
      <div class="nearby__content__highlight" >{{item.desc}}</div>
    </div>
   </div>
</template>
<script>
export default {
  name:'ShopItem',
  props:['item']
}
</script>
<style lang="scss" scoped>
@import '../style/viriables.scss';

  .nearby__item{
    display: flex;
    padding-top: .12rem;
    &__img{
      width: .56rem;
      margin-right: .16rem;
      height: .56rem;
    }
  }
   .nearby__content{
    flex: 1;
    padding-bottom: .12rem;
    border-bottom: .01rem solid $content-bgColor;
    &__title{
line-height: .22rem;
font-size: .16rem;
color: $content-font-color ;
    }
    &__tags{
      margin-top: .08rem;
      line-height: .18rem;
      font-size: .13rem;
      color: $content-font-color ;
    }
    &__tag{
      margin-right: .16rem;
    }
    &__highlight{
        margin-top: .08rem;
      line-height: .18rem;
      font-size: .13rem;
      color: #e93b3b;
    }
  }
</style>>

