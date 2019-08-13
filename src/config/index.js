// 开发环境接口
let BasicUrl = ''
if (process.env.NODE_ENV === 'development') {
  BasicUrl = 'http://zb.haopengit.com'
} else {
  BasicUrl = ''
}

export default {
  BasicUrl
}