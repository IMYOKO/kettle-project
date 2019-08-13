// 测试环境接口
let BasicUrl = ''
if (process.env.NODE_ENV === 'development') {
  BasicUrl = 'http://localhost:8000'
} else {
  BasicUrl = ''
}

export default {
  BasicUrl
}