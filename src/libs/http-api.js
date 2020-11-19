import config from '@/config'
import HttpRequestObject from '@lemon/euler-app-h5/src/libs/http-api-request'

const youngerBaseUrl = config.youngerBaseUrl
const youngerBaseOpenUrl = config.youngerBaseOpenUrl
const eulerBaseMagicUrl = config.eulerBaseMagicUrl

var options = {}
if (config.headerRequest) {
  options.headerRequest = config.headerRequest
}
var headerOptions = {}
if (config.headerOpenRequest) {
  headerOptions.headerRequest = config.headerOpenRequest
}
var loadOptions = Object.assign({ loadingVisible: true }, options)
var loadHeaderOptions = Object.assign({ loadingVisible: true }, headerOptions)

export const MagicHttpAPI = HttpRequestObject.createAxiosInstance(eulerBaseMagicUrl, options)
export const HttpAPI = HttpRequestObject.createAxiosInstance(youngerBaseUrl, options)
export const HttpOpenAPI = HttpRequestObject.createAxiosInstance(youngerBaseOpenUrl, headerOptions)
export const LoadHttpAPI = HttpRequestObject.createAxiosInstance(youngerBaseUrl, loadOptions)
export const LoadHttpOpenAPI = HttpRequestObject.createAxiosInstance(youngerBaseOpenUrl, loadHeaderOptions)
export const downloadUrl = config.viewUrlPre
export default HttpAPI
