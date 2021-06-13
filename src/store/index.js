import { createStore } from 'vuex'
const setLocalStorage=(state)=>{
  const {cartList}=state
  let jsonString=JSON.stringify(cartList)
  localStorage.setItem('cartList',jsonString)
}
const getLocalStorage=()=>{
  return  JSON.parse(localStorage.getItem('cartList')) || {}
}

export default createStore({
  state: {
    cartList:getLocalStorage()
  },
  mutations: {
    changeItemToCart(state,payload){
      const {shopId,productId,productInfo,num}=payload
      let shopInfo=state.cartList[shopId]
      if(!shopInfo){
        shopInfo={
        "shop_name":'',
        productList:{}
      }
    }
      let product=shopInfo['productList'][productId]
      if(!product){
        product=productInfo
        product.count=0
      }
      product.count+=num
      if(num>0){
        product.checked=true
      }
      if(product.count<0){product.count=0}
      shopInfo['productList'][productId]=product
      state.cartList[shopId]=shopInfo
      setLocalStorage(state)
    },
    changeItemChecked(state,data){
      const {shopId,productId}=data
      let product=state.cartList[shopId]['productList'][productId]
      product.checked=!product.checked
      setLocalStorage(state)
    },
    cleanAllProducts(state,data){
      console.log(11111)
       const {shopId}=data
       console.log(shopId)
      //  let products=state.cartList[shopId]
      //  console.log(products)
      //  products={}
      state.cartList[shopId]['productList']={}
      setLocalStorage(state)
    },
    setAllChecked(state,data){
      const {shopId}=data
      const productList=state.cartList[shopId]['productList']
      console.log(111)
      if(productList){
        for(let i in productList ){
          productList[i]['checked']=true
        }
      }
      setLocalStorage(state)
    },
    changeShopName(state,data){
      const {shopId,shop_name}=data
      const shopInfo=state.cartList[shopId] || {
        "shop_name":'',
        productList:{}
      }
      shopInfo["shop_name"]=shop_name
      state.cartList[shopId]=shopInfo
      setLocalStorage(state)
    },
    cleanCartData(state,data){
      const {shopId}=data
      state.cartList[shopId].productList={}
      setLocalStorage(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
