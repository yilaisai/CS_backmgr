const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
let archiver
let iconv
try {
  archiver = require('archiver')
  // 解决复制中文乱码问题
  iconv = require('iconv-lite')
} catch (error) {
  console.log('有未安装的模块, yarn install 一下...')
  process.exit()
}
let command = {
  '-t': 'target',
  '-o': 'outputName',
  '-c': 'compression'
}
let required = {
  target: '',
  outputName: '',
  compression: 'zip'
}
let paramsArr = process.argv.slice('2')
for(let i = 0; i < paramsArr.length; i++) {
  if (command[paramsArr[i]] && paramsArr[i+1]) {
    required[command[paramsArr[i]]] = paramsArr[++i]
  }
}

let isHaveParams = Object.keys(required).every(key => required[key])
if (!isHaveParams) {
  console.log('-t 目标文件夹, -o 输出文件名 是必须参数')
  process.exit()
}


const outputName = required.outputName + '.' + required.compression
const inputDir = required.target
let outputPath = path.join(__dirname, outputName)
let output = fs.createWriteStream(outputPath);

let archive = archiver(required.compression, {
  zlib: { level: 9 }
})

//管道连接
archive.pipe(output);
//压缩文件到压缩包
archive.directory(inputDir, inputDir);
//开始压缩
archive.finalize();
//监听压缩、传输数据过程中的错误回调
archive.on('error', function(err) {//压缩失败
  console.log('压缩失败')
});
//监听压缩、传输数据结束
output.on('close', function() {//压缩完成
  console.log('压缩完成')
  console.log(`地址: << ${outputPath} >>, 已复制到剪贴板中.`)
  exec('clip').stdin.end(iconv.encode(outputPath, 'gbk'))
})
