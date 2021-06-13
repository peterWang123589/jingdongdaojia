import {useStore} from 'vuex'
import {toRefs} from 'vue'
export const useCartEffect=()=>{
  const store=useStore()
  const {cartList}=toRefs(store.state)
  const changeItemToCart=(shopId,productId,productInfo,num)=>{
      // console.log(shopId,productId,productInfo)
      store.commit('changeItemToCart',{
        shopId,productId,productInfo,num
      })

  }
  return {cartList,changeItemToCart}
}