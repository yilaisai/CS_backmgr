import axios from 'axios'
import { Notification } from 'element-ui'
import router from '@/router'
import store from '../store'
import qs from 'qs'
axios.defaults.baseURL = localStorage.getItem('SERVER_PATH') || SERVER_PATH

const httpInstance = axios.create({
	responseType: 'json',
	timeout: 5000,
	params: {},
	data: {},
	validateStatus(status) {
		return status >= 200 && status < 300
	},
})

function responseErrorHandler(error) {
	store.commit('updateLoadingStatus', {
		isLoading: false
	})
	let text = '未知错误'
	const response = JSON.parse(JSON.stringify(error))
	if (response.status) {
		const {code, msg} = response.data
		text = msg
		if (code === 40008) {
			localStorage.removeItem('wallet_roleName')
			localStorage.removeItem('wallet_menuUrls')
			localStorage.removeItem('menuDefaultActive')
			localStorage.removeItem('wallet_token')
			localStorage.removeItem('wallet_username')
			router.push({
				name: 'Login'
			})
		}
	} else {
		text = '请求超时'
		// 切换请求地址
		if((new Date().getTime()-(localStorage.getItem('setUrlTime')||0))/1000>10){
			if(axios.defaults.baseURL == window.SERVER_PATH) {
				axios.defaults.baseURL = window.SERVER_PATH2
			}else {
				axios.defaults.baseURL = window.SERVER_PATH
			}
			localStorage.setItem("SERVER_PATH", axios.defaults.baseURL)
			localStorage.setItem("setUrlTime", new Date().getTime())
		}
		
	}

	Notification({
		type: 'error',
		title: '请求错误',
		message: text,
		duration: 5000,
	})
}

httpInstance.interceptors.request.use((config) => {
	config.url = axios.defaults.baseURL + config.url
	const configs = config

	const token = localStorage.getItem('wallet_token')
	if (token) {
		config.headers.token = token
		if (configs.method == "post") {
			configs.data.token = token
		} else {
			configs.params.token = token
		}
	}
	store.commit('updateLoadingStatus', {
		isLoading: true
	})
	const obj = {}
	Object.entries(config.data).forEach(([key, value]) => {
		if (value || value === '0' || value === 0 || value == 'empty') {
			obj[key] = value == 'empty' ? '' : value
		}
	})
	config.data = obj
	if (config.method === 'post' && config.data.postDataType !== 'Bean') {
		configs.data = qs.stringify(config.data)
	}
	return configs
}, error => Promise.reject(error))

httpInstance.interceptors.response.use((response) => {
	const {status, data} = response
	const {code, msg} = data
	store.commit('updateLoadingStatus', {
		isLoading: false
	})
	if (status === 200) {
		if (code == 200) {
			return data
		}
		responseErrorHandler(response)
	}
	return Promise.reject(response)
}, (error) => {
	responseErrorHandler(error)
	return Promise.reject(error)
})

export const $http = {
	get: (url, params = null, config = {}) => {
		const normalizedParams = params
		return httpInstance.get(url, {
			params: normalizedParams,
			...config,
		})
	},
	post: (url, data = null, config = {}) => httpInstance.post(url, data, config),
	postBean: (url, data = null, config = {}) => {
		data.postDataType = 'Bean'
		httpInstance.post(url, data, config)
	},
	put: (url, params = null, config = {}) => httpInstance({
		method: 'PUT',
		url,
		params,
		...config
	}),
	delete: (url, params = null, config = {}) => httpInstance({
		method: 'DELETE',
		url,
		params,
		...config
	})
}

export default {
	install(Vue) {
		Object.defineProperty(Vue.prototype, '$http', {
			value: $http,
			writable: false,
		})
	},
}
