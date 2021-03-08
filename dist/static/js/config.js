var locationHref = window.location.href
var apiLink = window.location.host.split('.')
var param1 = 'api'
var param2 = apiLink[1]+'.'+apiLink[2]
if(locationHref.indexOf('192.168') >= 0 || locationHref.indexOf('localhost') >= 0) {
	// window.SERVER_PATH = "http://192.168.120.42:7036"    //李海
	// window.SERVER_PATH2 = "http://192.168.120.42:7036"
	// window.SERVER_PATH2 = 'http://192.168.120.108:7036'//付岳
	// window.SERVER_PATH = 'http://192.168.120.108:7036'
	window.SERVER_PATH = "https://api.ubao.io"
	window.SERVER_PATH2 = "https://api.ubao.io"
} else {
	window.SERVER_PATH = `https://${param1}.${param2}/`
	window.SERVER_PATH2 = `https://${param1}.${param2}/`
}
