// 开发环境接口
let BasicUrl = ''
if (process.env.NODE_ENV === 'development') {
  BasicUrl = 'http://zb.haopengit.com'
} else {
  BasicUrl = ''
}

// 微信配网
let Ssid = ''
let WpaPsk = ''
let WifiUrl = ''
if (process.env.NODE_ENV === 'development') {
  Ssid = 'MTK_SOFT_AP'
  WpaPsk = '12345678'
  WifiUrl = 'http://192.168.1.102'
} else {
  Ssid = ''
  WpaPsk = ''
  WifiUrl = ''
}

export default {
  BasicUrl,
  Ssid,
  WpaPsk,
  WifiUrl
}