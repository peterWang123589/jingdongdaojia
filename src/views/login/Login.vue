<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="wrapper__img">
    <div class="wrapper__input">
      <input type="text" class="wrapper__input__content" placeholder="请输入手机号" v-model='data.username'/>
    </div>
    <div class="wrapper__input">
      <input type="text" class="wrapper__input__content" placeholder="请输入密码" v-model='data.password' />
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登录</div>
     <div class="wrapper__login-link"  @click="handleRegister">立即注册</div>
  </div>
  <Toast v-if='toastData.isShow' :toastmsg='toastData.toastMessage'/>
</template>

<script>
import {useRouter} from 'vue-router'
// import axios from 'axios'
import {reactive} from 'vue'
import {post} from '../../utils/request'
import Toast,{useToastEffect} from '../../components/Toast'
const useLoginEffect=(showToast)=>{

const router=useRouter()
let url='/api/user/login'
 const data=reactive({
      username:'',
      password:'',
     
    })
   const handleLogin=async ()=>{
    try{
      const result=await post(url,{
      username:data.username,
      password:data.password
    })
    // console.log(result)
      if(result?.code==='200'){
        localStorage.isLogin=true
    router.push({'name':'Home'})
    }else{
      // alert('登录失败')
     showToast('登录失败')
    }
    }catch(e){
      showToast('请求失败')
    }
    }
    return {data,handleLogin}
}

   

export default {
  name: 'Login',
  components:{Toast},
  setup(){
   
    const router=useRouter()
    const {toastData,showToast}=useToastEffect()
    const {data,handleLogin}=useLoginEffect(showToast)
    const handleRegister=()=>{
      router.push({'name':'Register'})
    }
    return {handleLogin,handleRegister,data,toastData}
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper{
  position:absolute;
  left:0;
  right:0;
  top: 50%;
  transform: translate(0,-50%);
  &__img{
    display: block;
    width: .66rem;
    height: .66rem;
    margin: 0 auto .4rem auto;
  }
  &__input{
    height: .48rem;
    margin: 0 .4rem .16rem .4rem;
    padding: 0 .16rem;
    background: #f9f9f9;
    border: .01rem solid rgba(0,0,0,.1);
    border-radius: .06rem;
    &__content{
      width: 100%;
      border: none;
      outline: none;
      line-height: .48rem;
      background: none;
      font-size: .16rem;
      color: $content-notice-font-color;
      &::placeholder{
        color: $content-notice-font-color;
      }
    }
  }
  &__login-button{
  margin:.32rem .4rem .16rem .4rem ;
  line-height: .48rem;
  background: #0091ff;
  box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
  border-radius: .04rem;
  color: #fff;
  font-size:.16rem;
  text-align: center;
  }
   &__login-link{
    text-align: center;
    font-size: .14rem;
    color: $content-notice-font-color;
  }
}
</style>
