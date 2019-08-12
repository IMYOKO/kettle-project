import BasicApi from './index'

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOnsiaWQiOjEsInVzZXJuYW1lIjoieW9rbyIsInJlYWxuYW1lIjoi546L54WcIn0sImV4cCI6MTU2MzY5NjE2Njg1M30.zl2icos0kclI9HT91DgKAjjqJuBGW48ikcDL0HF56PA'
const setHeaders = (token) => {
  return {
    'x-access-token': token
  }
}

class Api extends BasicApi {
  constructor() {
    super()
  }

  getBanner () {
    return this.get('/api/blog/list?isadmin=1', setHeaders(token))
  }

  

}

const api = new Api()

export default api