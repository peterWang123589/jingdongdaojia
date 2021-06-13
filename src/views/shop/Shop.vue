<template>
<div class="wrapper">
  <div class="search">
     <div class="search__back logo" @click="handleBack">&#xe64a;</div>
      <div class="search__content ">
         <span class="search__content__icon logo ">&#xe7ae;</span>
          <input type="text" class="search__content__input " placeholder="请输入商品名称">
      </div>
  </div>
  <!--v-show='data.data.imgUrl'是为了解决图片闪动的问题,等数据全部加载完再显示组件，但实际效果好像不怎么行 -->
 <ShopItem :item="data.data" v-show='data.data.imgUrl'/>
</div>
<Content :shopName="data.data.title"/>
<Cart/>
</template>
<script>
import { reactive } from 'vue'
import {useRouter,useRoute} from 'vue-router'
import ShopItem  from '../../components/ShopItem'
import {get} from '../../utils/request'
import Content from './Content'
import Cart from './Cart'
const useGetDataEffect=()=>{
  const route=useRoute()
     const obj={
      data:{}
     }
    const data=reactive(obj)
    //route.params.id获取路由参数
    let url=`/api/shop/${route.params.id}`
    const getData=async ()=>{
   
     const res=  await get(url)
  
    if(res.code===200&&res?.data){
      //  console.log(res)
        data.data=res.data
    }
    }

    return {data,getData}
}
 export default { 
   name:'Shop',
   components:{ShopItem,Content,Cart},
  //  mounted(){
  //    console.log(this)
  //    window.vuethis=this 
  //  },
   setup(){
     const router=useRouter()
     const {data,getData}=useGetDataEffect()
     getData()
    const handleBack=()=>{
      router.back()
    }
    return {data,handleBack}
   }

 }
</script>
<style lang='scss' scoped>
@import '../../style/viriables.scss';
 .wrapper{
   padding:0 .18rem;
 }
 .search{
   line-height: .32rem;
   display: flex;
   margin: .2rem 0 .16rem 0;
   &__back{
     height: .32rem;
     width: .3rem;
     font-size: .24rem;
     color: #b6b6b6;
     
   }
   &__content{
     flex: 1;
 border-radius: .16rem;
     background: #f5f5f5;
    display: flex;
     &__icon{
       width: .44rem;
       text-align: center;
       
       color: #b7b7b7;
       
     }
     &__input{
       display: block;
       padding-right: .2rem;
       width: 100%;
       border: none;
       outline: none;
       background: none;
       height: .32rem;
       font-size: .14rem;
       color:$content-font-color ;
       &::placeholder{
         color: $content-font-color;
       }
     }
   }
 }
</style>