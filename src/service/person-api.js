import { HttpOpenAPI } from '@/libs/http-api'

export default {
  sendVerifyCode (params, success, error) {
    const url = '/open/open_auth/send_verify_code'
    HttpOpenAPI.createAxiosPost(url, params, success, error)
  }, // 用户登录
  userLogin (params, success, error) {
    const url = '/euler/open_login/login_credential'
    HttpOpenAPI.createAxiosPost(url, params, success, error)
  }, // 短信登录
  messageLogin (params, success, error) {
    const url = '/euler/open_login/login'
    HttpOpenAPI.createAxiosPost(url, params, success, error)
  }, // 获取验证码
  codeLogin (params, success, error) {
    const url = '/euler/open_sms/send_verify_code'
    HttpOpenAPI.createAxiosPost(url, params, success, error)
  }, // 短信验证修改密码
  messagePwd (params, success, error) {
    const url = '/euler/open_member/update_password_verify_code'
    HttpOpenAPI.createAxiosPost(url, params, success, error)
  }
}
