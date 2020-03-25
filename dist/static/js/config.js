
var SERVER_PATH = '',
	SERVER_PATH2 = ''
if(window.location.href.indexOf('homo.plus') >= 0) {
	//num22  正式环境
	SERVER_PATH = 'https://api.homo.plus/'
	SERVER_PATH2 = 'https://api.homo.plus/'
}else if( window.location.href.indexOf('admin.icoinease.com')>0 ){
	SERVER_PATH2 = 'https://api.icoinease.com/'
	SERVER_PATH = 'https://api.icoinease.com/'
}else {//开发环境
	// SERVER_PATH2 = 'http://47.52.110.161:7036/'
	// SERVER_PATH = 'http://47.52.110.161:7036/'

	// SERVER_PATH2 = 'http://c28w749426.zicp.vip/'  //林威远程
	// SERVER_PATH = 'http://c28w749426.zicp.vip/'
	
	// SERVER_PATH = 'http://192.168.120.108:7036/'
	// SERVER_PATH2 = 'http://192.168.120.108:7036/' 
	// SERVER_PATH = 'http://192.168.120.42:7036/'  //林威
		SERVER_PATH2 = 'https://api.icoinease.com/'  //测试
		SERVER_PATH = 'https://api.icoinease.com/'
	// SERVER_PATH2 = 'http://192.168.120.42:7036/' 
	// SERVER_PATH = 'http://192.168.120.53:7036/'  //李海
}