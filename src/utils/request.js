import axios from 'axios'
const instance=axios.create({
  baseURL:'https://www.fastmock.site/mock/c5b9e620cdd0effad45ab741292d8197/jd',
  timeout:10000
})

export const get = (url,params={})=>{
  return new Promise((resolve,reject)=>{
    instance.get(url,{params}).then((res)=>{
      resolve(res.data)
    },(err)=>{
      reject(err)
    })
  })
  }



export const post = (url,data={})=>{
return new Promise((resolve,reject)=>{
  instance.post(url,data,{
    headers:{
      'Content-Type':'application/json'
    }
  }).then((res)=>{
    resolve(res.data)
  },(err)=>{
    reject(err)
  })
})
}