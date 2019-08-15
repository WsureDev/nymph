import http from './interface'

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
export const openId = (data) => {
	/* http.config.baseUrl = "http://localhost:8080/api/"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		}
	} */
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		// console.log('个性化response....')
		return response
	}
    return http.request({
        url: 'api/code2Session',
		method: 'POST',
        data,
    })
}

// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	openId,
	
}