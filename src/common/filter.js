/**
 *  Created by   阿紫
 *  On  2018/8/8
 *  Content
 */

import Vue from "vue";

export const convertTransactionType = (value) => {
  switch (value) {
    case '1':
      return '全部';
    case '2':
      return '充币';
    case '3':
      return '提币';
    case '4':
      return '站内互转';
    case '5':
	  return '红包';
	case '6':
	  return '划转';
  }
  return '';
};
Vue.filter('convertTransactionType', convertTransactionType);


export const transferQueryStatusType = (value) => {
  switch (value) {
    case 0:
      return '失败';
    case 1:
      return '成功';
    case 2:
      return '待审核';
    case 3:
      return '审核不通过';
    case 4:
      return '审核通过';
    case 5:
      return '处理中';
    case 6:
      return '已支付';
    case 7:
      return '已发送';
  }
};
Vue.filter('transferQueryStatusType', transferQueryStatusType);
