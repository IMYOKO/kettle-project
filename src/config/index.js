// 测试环境接口
let BasicUrl = ''
if (process.env.NODE_ENV === 'development') {
  BasicUrl = 'http://localhost:8000'
}else {
    BasicUrl = 'https://ark.huitaojuzg.com/'
}

export default {
  BasicUrl
}