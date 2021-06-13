<template>
   <div class="docker">
    <div  :class="{docker__item:true,'docker__item--active':index===currentIndex}" v-for="(item,index) in dockerlist" :key='item'>
    <router-link :to='item.to'>
             <div class="logo" v-html="item.icon"></div>
      <div class="docker__title">{{item.desc_word}}</div>
    </router-link>

   
      </div>
    </div>
</template>
<script>
export default {
  name: 'Docker',
  props:['currentIndex'],
  setup () {
    const dockerlist = [{
      icon: '&#xe601;', desc_word: '首页',to:{name:"Home"}
    },
    {
      icon: '&#xe602;', desc_word: '购物车',to:{name:"Cart"}
    },
    {
      icon: '&#xe600;', desc_word: '订单',to:{name:"orderList"}
    },
    {
      icon: '&#xe616;', desc_word: '我的',to:{name:"Home"}
    }
    ]
    return { dockerlist }
  }
}
</script>
<style lang='scss' scoped>
@import '../style/viriables.scss';
@import '../style/mixins.scss';
.docker{
  color: $content-font-color;
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: .49rem;
  border-top: .01rem solid $content-bgColor;

  padding: 0 .18rem;
  box-sizing: border-box;
  &__item{
  flex: 1;
 text-align: center;
 a {
   color: $content-font-color;
   text-decoration: none;
 }

 &--active{
    a{
       color: #1fa4fc;
   text-decoration: none;
    }
   }
  }
  &__title{
   font-size:.2rem ;
   transform: scale(.5,.5);
   transform-origin: top center;
  }
}
</style>
