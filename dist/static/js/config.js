
var SERVER_PATH = ''
if(window.location.href.indexOf('https://admin.num22.org') >= 0) {
	//num22  正式环境
	SERVER_PATH = 'https://aip.num22.org'
}else {//开发环境
	// SERVER_PATH = 'http://192.168.120.42:7036/'  //林威
	// SERVER_PATH = 'http://192.168.120.108:7036/'  //付岳
	// SERVER_PATH = 'http://192.168.120.194:7036/'  //李海
	SERVER_PATH = 'http://47.52.110.161:7036/'
}