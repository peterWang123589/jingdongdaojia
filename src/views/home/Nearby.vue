<template>
  <div class="nearby">
  <h3 class="nearby__title">
    附近店铺
  </h3>
     <router-link :to='`/shop/${item._id}`' v-for="item in nearbylist" :key="item._id">
       <ShopItem    :item="item"/>
     </router-link>
     

   </div>

</template>
<script>
import {ref} from 'vue'
import {get} from '../../utils/request'
import ShopItem from '../../components/ShopItem'
const useNearbyListEffect=()=>{
 const nearbylist = ref([])
    let url='/api/shop/hot-list'
    const getNearbyList=async ()=>{
        const result=await get(url)
        if(result?.code===200&&result?.data?.length){
            // console.log(result.data)
            nearbylist.value=result.data
        }
    }
  return {nearbylist,getNearbyList}
}
export default {
  name: 'Nearby',
  components:{ShopItem},
  setup () {
    const {nearbylist,getNearbyList}=useNearbyListEffect()
      getNearbyList()
    return { nearbylist }
  }
}
</script>
<style lang='scss' scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.nearby{
  &__title{
    margin:.16rem 0 .04rem 0 ;
    font-size: .18rem;
    color: $content-font-color;
    font-weight: normal;
  }
  & a{
    text-decoration: none;
  }

}
</style>
