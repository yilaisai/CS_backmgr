
var SERVER_PATH = '',
	SERVER_PATH2 = ''
if(window.location.href.indexOf('admin.num22.org') >= 0) {
	//num22  正式环境
	SERVER_PATH = 'https://apimly.num22.org/'
	SERVER_PATH2 = 'https://api.num22.org/'
}else if( window.location.href.indexOf('admin.icore.plus')>0 ){
	SERVER_PATH2 = 'https://api.icore.plus/'
	SERVER_PATH = 'https://api.icore.plus/'
}else {//开发环境
	// SERVER_PATH2 = 'http://47.52.110.161:7036/'
	// SERVER_PATH = 'http://47.52.110.161:7036/'

	// SERVER_PATH2 = 'http://c28w749426.zicp.vip'  //林威远程
	// SERVER_PATH = 'http://c28w749426.zicp.vip'
	
	// SERVER_PATH = 'http://192.168.120.108:7036/'
	// SERVER_PATH2 = 'http://192.168.120.108:7036/' 
	// SERVER_PATH = 'http://192.168.120.42:7036/'  //林威
	// SERVER_PATH2 = 'http://192.168.120.42:7036/' 
	// SERVER_PATH = 'http://192.168.120.53:7036/'  //李海
	// SERVER_PATH = 'https://api.num22.org/'
	SERVER_PATH2 = 'https://api.icore.plus/'  //测试
	SERVER_PATH = 'https://api.icore.plus/'
}