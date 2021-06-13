<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="wrapper__img">
    <div class="wrapper__input">
      <input type="text" class="wrapper__input__content" placeholder="请输入手机号" v-model="data.username"/>
    </div>
    <div class="wrapper__input">
      <input type="password" class="wrapper__input__content" placeholder="请输入密码" v-model='data.password'  />
    </div>
    <div class="wrapper__input">
      <input type="password" class="wrapper__input__content" placeholder="确认密码" v-model='data.ensurence'  />
    </div>
    <div class="wrapper__register-button" @click="handleRegister" >注册</div>
     <div class="wrapper__register-link" @click="handleLogin">已有账号去登录</div>
  </div>
    <Toast v-if='toastData.isShow' :toastmsg='toastData.toastMessage'/>
</template>

<script>
import {useRouter} from 'vue-router'
import {reactive} from 'vue'
import Toast,{useToastEffect} from '../../components/Toast'
import {post} from '../../utils/request'
const useRegisterEffect=(showToast)=>{
  const router=useRouter()
    let url='/api/user/register'
 const data=reactive({
      username:'',
      password:'',
     ensurence:''
    })
    const handleRegister=async ()=>{
    
    try{
      const result=await post(url,{
      username:data.username,
      password:data.password
    })
    console.log(result,'111')
      if(result?.code==='200'){

    router.push({'name':'Login'})
    }else{
      // alert('登录失败')
     showToast('注册失败')
    }
    }catch(e){
      showToast('请求失败')
    }

    }
    return {data,handleRegister}
}
export default {
  name: 'Register',
  components:{Toast},
  setup(){
    const router=useRouter()
    const {showToast,toastData}=useToastEffect()
    const {data,handleRegister}=useRegisterEffect(showToast)
    const handleLogin=()=>{
     
    router.push({'name':'Login'})
    }
    return {handleLogin,data,handleRegister,toastData}
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
  &__register-button{
  margin:.32rem .4rem .16rem .4rem ;
  line-height: .48rem;
  background: #0091ff;
  box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
  border-radius: .04rem;
  color: #fff;
  font-size:.16rem;
  text-align: center;
  }
   &__register-link{
    text-align: center;
    font-size: .14rem;
    color: $content-notice-font-color;
  }
}
</style>
