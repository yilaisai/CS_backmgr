
var SERVER_PATH = '',
	SERVER_PATH2 = ''
if(window.location.href.indexOf('https://admin.num22.org') >= 0) {
	//num22  正式环境
	SERVER_PATH = 'https://apimly.num22.org/'
	SERVER_PATH2 = 'https://api.num22.org/'
}else if( window.location.href.indexOf('devadmin.hongmo.io')>0 ){
	SERVER_PATH2 = 'http://47.52.110.161:7036/'
	SERVER_PATH = 'http://47.52.110.161:7036/'
}else {//开发环境
	SERVER_PATH = 'http://47.52.110.161:7036/'
	// SERVER_PATH = 'http://192.168.120.42:7036/'  //林威
	// SERVER_PATH = 'http://192.168.120.53:7036/'  //李海
	// SERVER_PATH2 = 'http://192.168.120.53:7036' 
	// SERVER_PATH = 'https://api.num22.org/'
	SERVER_PATH2 = 'http://192.168.120.42:7036/'
}