import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import cookie from 'js-cookie'


// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:9001', // api的base_url
  timeout: 20000 // 请求超时时间
})


// response 拦截器
// service.interceptors.response.use(
//   response => {
//     /**
//      * code为非20000是抛错 可结合自己业务进行修改
//      */
//     const res = response.data
//     if (res.code !== 20000) {
//       Message({
//         message: res.message,
//         type: 'error',
//         duration: 5 * 1000
//       })
//       return Promise.reject('error')
//     } else {
//       return response.data
//     }
//   },
//   error => {
//     console.log('err' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )
// // http response 拦截器
service.interceptors.response.use(
  response => {
    //debugger
    const res = response.data
    if (res.code == 28004) {
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
      //debugger
      window.location.href = "/login"
      return
    } else {
      if (res.code !== 20000) {
        //25000：订单支付中，不做任何提示
        if (res.code == 25000) {
          return res.success = 'false'
        } else {
          Message({
            message: res.message,
            type: 'error',
            duration: 5 * 1000
          })
          return Promise.reject('error')
        }
      } else {
        return response.data;
      }
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)   // 返回接口返回的错误信息
  });
// http request 拦截器
service.interceptors.request.use(
  config => {
    //debugger
    if (cookie.get('user_token')) {
      config.headers['token'] = cookie.get('user_token');
    }
    return config
  },
  err => {
    return Promise.reject(err);
  })

export default service
