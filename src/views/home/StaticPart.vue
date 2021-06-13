<template>
  <div class="positionBar">
  <span class="logo positionBar__position">&#xe60e;</span>
 北京理工大学国防科技园2号楼10层
   <span class="logo positionBar__bell">&#xe62b;</span>
</div>
<div class="search">
<span class="logo">&#xe7ae;</span>
<span>山姆会员商店优惠商品</span>
</div>
<div class="banner">
  <img class="banner__img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="">
  </div>
<div class="icons">
    <div class="icons__item" v-for='item in iconlist' :key='item'>
      <img :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`" alt="" class="icons__item__img">
      <p class="icons__item__desc">{{item.desc}}</p>
    </div>

</div>
<div class="gap"></div>
</template>
<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconlist = [
      {
        imgName: '超市',
        desc: '超市便利'
      },
      {
        imgName: '菜市场',
        desc: '菜市场'
      },
      {
        imgName: '水果店',
        desc: '水果店'
      },
      {
        imgName: '鲜花',
        desc: '鲜花绿植'
      },
      {
        imgName: '医药健康',
        desc: '医药健康'
      },
      {
        imgName: '家居',
        desc: '家居时尚'
      },
      {
        imgName: '蛋糕',
        desc: '烘焙蛋糕'
      },
      {
        imgName: '签到',
        desc: '签到'
      },
      {
        imgName: '大牌免运',
        desc: '大牌免运'
      },
      {
        imgName: '红包',
        desc: '红包套餐'
      }]
    return { iconlist }
  }
}
</script>
<style lang='scss' scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
  .positionBar{
    color:$content-font-color;
    position: relative;
    @include ellipsis;
   padding: .16rem .24rem .16rem 0;
   line-height: .22rem;
   font-size: .16rem;
   &__position{
     position: relative;
     top: .01rem;
     font-size: .2rem;
   }
   &__bell{
     position: absolute;
     right: 0;
     top: .17rem;
     font-size: .2rem;
   }
  }
  .search{
  line-height: .32rem;
  margin: .12rem;
  background: #f5f5f5;
  color: #b7b7b7;
  border-radius: .16rem;
  font-size: .14rem;
  .logo{
    display: inline-block;
    font-size: .16rem;
    padding: 0 .15rem 0 .1rem;
  }
}
.banner {
  overflow: hidden;
    height: 0;
    padding-bottom: ($bannerHeight / $bannerWidth) * 100%;
  .banner__img{
    width: 100%;
  }
}
.icons{
  margin-top: .16rem;
  display: flex;
  flex-wrap: wrap;
 &__item{
  width: 20%;
  &__img{
    display: block;
    margin: 0 auto;
    width: .4rem;
    height: .4rem;
  }
  &__desc{
    text-align: center;
    margin: .06rem 0 .16rem 0;
    color: $content-font-color;
  }
  }
}
.gap{
  height: .1rem;
  background: $content-bgColor;
  margin:0 -.18rem ;
}
</style>
