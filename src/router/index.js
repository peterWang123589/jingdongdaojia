import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/home/Home.vue'
// import Login from '../views/login/Login.vue'
// import Register from '../views/register/Register.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component:()=>{return import(/*webpackChunkName:"home"*/"../views/home/Home.vue")}

  },
  {
    path: '/cart',
    name: 'Cart',
    component:()=>{return import(/*webpackChunkName:"cart"*/"../views/cart/Cart.vue")}

  },
  {
    path: '/orderList',
    name: 'orderList',
    component:()=>{return import(/*webpackChunkName:"orderList"*/"../views/orderList/orderList.vue")}

  },
  {
    path: '/orderConfirmation/:id',
    name: 'orderConfirmation',
    component:()=>{return import(/*webpackChunkName:"orderConfirmation"*/"../views/orderConfirmation/orderConfirmation.vue")}

  },
  {
    path: '/login',
    name: 'Login',
    component:()=>{return import(/*webpackChunkName:"login"*/'../views/login/Login.vue')},
    beforeEnter(to,from,next){
      //beforeEnter不像beforeEach,只针对当前路由，不针对所有路由
   if(localStorage.isLogin){
     next({name:'Home'})
   }else{next()}
    }

  },
  {
    path: '/register',
    name: 'Register',
    component: ()=>{return import(/*webpackChunkName:"register"*/'../views/register/Register.vue')},
    beforeEnter(to,from,next){
      //beforeEnter不像beforeEach,只针对当前路由，不针对所有路由
   if(localStorage.isLogin){
     next({name:'Home'})
   }else{next()}
    }

  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component:()=>{return import(/*webpackChunkName:"shop"*/"../views/shop/Shop.vue")}

  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  //  针对每个路由跳转执行的操作
  // const { isLogin } = localStorage
  // const isLogin=false
  // (isLogin || to.name === 'Login') ? next() : next({ name: 'Login' })
  const {isLogin}=localStorage
  const {name}=to
  const isLoginOrRegister=(name==='Login' || name === 'Register')
if(isLogin || isLoginOrRegister){
  next()
}else{
  next({name:'Login'})
}
})

export default router
