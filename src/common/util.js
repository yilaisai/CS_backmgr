/**
 *  Created by   阿紫
 *  On  2018/8/8
 *  Content
 */

import Vue from 'vue';

export const convertNull = value => (value || 0);
Vue.filter('convertNull', convertNull);

export const convertNum = (value) => {
  if (value) {
    return value / 100;
  }
  return 0;
};
Vue.filter('convertNum', convertNum);


// 验证手机号
export const isPhoneNumber = (str) => {
  const reg = /^1[34578]\d{9}$/;
  return reg.test(str);
};

// 金额初始话
export const sum100 = num => num * 100;

// 日期

export const dateFormat = function (date, fmt = 'YYYY-MM-DD') {

  let newDate = date;

  let fmts = fmt;

  //console.log(fmt)
  //fmts='YYYY-MM-DD HH:mm:ss'
  if (!newDate) {
    newDate = new Date;
  }
  if (typeof +newDate === 'number') {
    newDate = new Date(newDate);
  }
  const o = {
    'M+': newDate.getMonth() + 1,
    'D+': newDate.getDate(),
    'h+': newDate.getHours() % 12 === 0 ? 12 : newDate.getHours() % 12,
    'H+': newDate.getHours(),
    'm+': newDate.getMinutes(),
    's+': newDate.getSeconds(),
    'q+': Math.floor((newDate.getMonth() + 3) / 3),
    S: newDate.getMilliseconds(),
  };
  const week = {
    0: '\u65e5',
    1: '\u4e00',
    2: '\u4e8c',
    3: '\u4e09',
    4: '\u56db',
    5: '\u4e94',
    6: '\u516d',
  };
  if (/(Y+)/.test(fmts)) {
    fmts = fmts.replace(RegExp.$1, (`${newDate.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmts)) {
    fmts = fmts.replace(RegExp.$1, () => {
      if (RegExp.$1.length > 1) {
        if (RegExp.$1.length > 2) {
          return `\u661f\u671f${week[newDate.getDay()]}`;
        }
        return `\u5468${week[newDate.getDay()]}`;
      }
      return week[`${newDate.getDay()}`];
    });
  }
  Object.keys(o)
    .forEach((k) => {
      if (new RegExp(`(${k})`).test(fmts)) {
        fmts = fmts.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
      }
    });
  return fmts;
};

Vue.filter('dateFormat', dateFormat);

class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

// 你可以这样使用: typeValidate({})('String') === false
export function typeValidate(obj) {
  const types = [
    'Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map',
    'WeakMap', 'Set', 'WeakSet', 'Object', 'Null', 'Undefined', 'Boolean', 'Array',
  ];
  return (type) => {
    if (types.indexOf(type) > -1) {
      return Object.prototype.toString.call(obj) === `[object ${type}]`;
    }
    throw new CustomError('Invalid test type');
  };
}

//获取当天的时间区间  YYYY-MM-DD HH:mm:ss
export function getTodayTime() {
	const nowTime = new Date()
	const dateObj = {
		'YYYY': nowTime.getFullYear(),
		'MM': (nowTime.getMonth() + 1) < 10 ? ('0' + (nowTime.getMonth() + 1)) : (nowTime.getMonth() + 1),
		'DD': nowTime.getDate() < 10 ? ('0' + nowTime.getDate()) : nowTime.getDate(),
		'h+': nowTime.getHours() % 12 === 0 ? 12 : nowTime.getHours() % 12,
		'HH': nowTime.getHours(),
		'mm': nowTime.getMinutes() < 10 ? ('0' + nowTime.getMinutes()) : nowTime.getMinutes(),
		'ss': nowTime.getSeconds() < 10 ? ('0' + nowTime.getSeconds()) : nowTime.getSeconds(),
		'q+': Math.floor((nowTime.getMonth() + 3) / 3),
		S: nowTime.getMilliseconds(),
	}
	
	const startTime = dateObj['YYYY'] + '-' + dateObj['MM'] + '-' + dateObj['DD'] + ' 00:00:00'
	// const endTime = dateObj['YYYY'] + '-' + dateObj['MM'] + '-' + dateObj['DD'] + ' ' + dateObj['HH'] + ':' + dateObj['mm'] + ':' + dateObj['ss']
	const endTime = dateObj['YYYY'] + '-' + dateObj['MM'] + '-' + dateObj['DD'] + ' 23:59:59'
	return [startTime, endTime]
}

export function secondsChange(num) {
  let hour = Math.floor(num/(60*60))
  let min = Math.floor((num%(60*60))/60)
  let second = num%60
  min = min>9?min:'0'+min
  second = second>9?second:'0'+second
  return hour>0?`${hour}'${min}'${second}''`:`${min}'${second}''`
}
Vue.filter('secondsChange', secondsChange);

export function getYesterdayTime(){
  const nowTime = new Date(new Date().getTime() - 24*60*60*1000)
  const dateObj = {
		'YYYY': nowTime.getFullYear() + '',
		'MM': (nowTime.getMonth() + 1) < 10 ? ('0' + (nowTime.getMonth() + 1)) : (nowTime.getMonth() + 1),
		'DD': nowTime.getDate() < 10 ? ('0' + nowTime.getDate()) : nowTime.getDate()
  }
  const time = dateObj['YYYY']+dateObj['MM']+dateObj['DD']
  return time
}