
/**
 * 格式化数字
 */
// const fmtNumber = (n) => {
// 	n = n * 1
// 	if(n >= 10000) {
// 		return((n / 10000).toFixed(2) + "万").replace(/\.00/,'')
// 	} else {
// 		return n
// 	}
// }
const fmtNumber = (type, val) => {
	if(type == '%2') {
		return Math.floor(val * 10000) / 100
	}
	if(type == '/4') {
		// 15.123   0.1512
		return Math.floor(val * 100) / 10000
	}
	return val
}

/**
 * 格式化时间
 * @param {Object} obj
 * @param {String} type
 */
const fmtDate = (obj, type) => {
	obj = obj * 1
	let date = new Date(obj)
	let y = 1900 + date.getYear()
	let m = "0" + (date.getMonth() + 1)
	let d = "0" + date.getDate()
	let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
	let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
	let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
	switch(type) {
	case 'full':
		return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length) + " " + h + ":" + minutes + ":" + s
		break
	case 'time':
		return h + ":" + minutes + ":" + s
		break
	case 'month':
		
		return m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length) + " " + h + ":" + minutes
		break
	default: 
		return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length)
		break
	}
}

/**
 * 账号格式化
 * @param {String} str
 */
const fmtAccount = (str) => {
	if(/^[0-9]*$/.test(str)) {
		return str.replace(/(.{3}).*(.{4})/, "$1****$2")
	}else if(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(str)) {
		return str.replace(/(.{2}).*(@.{6})/, "$1****$2")
	}else {
		return str.replace(/(.{4}).*(.{4})/, "$1....$2")
	}
}

/**
 * 元素高度设置
 */
const setHeight = elem => {
	var fh = elem.parentNode
	elem.style.height = fh.clientHeight + "px"
}

/**
 * 客户端下载
 */
const downLoadApp = data => {
	const ua = navigator.userAgent.toLowerCase()
	let u = navigator.userAgent
	let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
	let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
	if(isAndroid) {
		if(ua.match('micromessenger')) {
			data.showGuidePop = true
		}else {
			window.location.href = window.ANDURL
		}
	} else if(isiOS) {
		if(ua.match(' qq')) {
			data.showGuidePop = true
		}else {
			window.location.href = window.IOSURL
		}
	} else {
		data.$dialog.alert({
			mes: '非Android、iOS'
		})
	}
}

/**
 * 检测浏览器语言
 */
const getLanguage = () => {
	let language = null
	let lang = ""
	if (navigator.appName == 'Netscape'){
		language = navigator.language
	} else{
		language = navigator.browserLanguage
	}
	if (language.indexOf('en') > -1){
		lang = "en-US"
	} else if (language.indexOf('zh') > -1){
		lang = "zh-CN"
	} else{
		lang = "en-US"
	}
	return lang
}

const IsPC = () => {
	var userAgentInfo = navigator.userAgent
	var Agents = ["Android", "iPhone",
		"SymbianOS", "Windows Phone",
		"iPad", "iPod", "android"]
	var flag = true
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false
			break
		}
	}
	return flag
}

const getBrowser = () => {
	var e = {
		version: function() {
			var e = navigator.userAgent
			return {
				ios: !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				android: e.indexOf("Android") > -1 || e.indexOf("Adr") > -1,
				mobilePhone: !!e.match(/AppleWebKit.*Mobile.*/),
				trident: e.indexOf("Trident") > -1,
				presto: e.indexOf("Presto") > -1,
				webkit: e.indexOf("AppleWebKit") > -1,
				gecko: e.indexOf("Gecko") > -1 && -1 == e.indexOf("KHTML"),
				iphone: e.indexOf("iPhone") > -1,
				iPad: e.indexOf("iPad") > -1,
				webApp: e.indexOf("Safari"),
				weixin: e.indexOf("MicroMessenger"),
				QQ: " qq" == e.match(/\sQQ/i)
			}
		}(),
		browserLanguage: (navigator.language || navigator.browserLanguage).toLowerCase()
	}
	e.version.ios || e.version.android || e.version.mobilePhone
	return e
}



const extendMethods = {
	fmtNumber,
	fmtDate,
	fmtAccount,
	setHeight,
	downLoadApp,
	getLanguage,
	IsPC,
	getBrowser
}

export default {
	install(Vue) {
		for(let [k, v] of Object.entries(extendMethods)) {
			Object.defineProperty(Vue.prototype, '$' + k, {
				value: v
			})
		}
	}
}

export {
	fmtNumber,
	fmtDate,
	fmtAccount,
	setHeight,
	downLoadApp,
	getLanguage,
	IsPC,
	getBrowser
}
