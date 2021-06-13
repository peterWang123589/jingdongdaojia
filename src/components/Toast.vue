<template>
  <div class="toast">{{toastmsg}}</div>
</template>
<script>
import {reactive} from 'vue'
export default {
  name:'Toast',
  props:['toastmsg'],
  setup() {
  
  },
}
export const useToastEffect=()=>{
  const toastData=reactive({
     isShow:false,
    toastMessage:''
  })
  const showToast=(msg)=>{
      toastData.isShow=true
      toastData.toastMessage=msg
      setTimeout(()=>{
        // console.log(data.toastMessage)
        toastData.isShow=false
        toastData.toastMessage=''
      },1500)
    }
  return {toastData,showToast}
}
</script>
<style lang='scss' scoped>
  .toast{
    position: fixed;
    z-index: 999;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%) scale(2);
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: .05rem;
    font-family: Helvetica, sans-serif;
    background: rgba(0,0,0,.55);
    color: #fff;
    font-size: 0.18rem;

  }
</style>