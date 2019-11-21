/**
 *  Created by   阿紫
 *  On  2018/8/8
 *  Content
 */

import Vue from "vue";

export const convertTransactionType = (value) => {
  switch (value) {
    case 1:
	  return '全部';
	  break
    case 2:
      return '充币';
    case 3:
      return '提币';
    case 4:
      return '站内互转';
    case 5:
	  return '红包';
	case 6:
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
//1, 3  4 5 6
export const advTypeFilter = (value) => {
  switch (value) {
    case 1:
      return '普通交易';
    case 2:
      return '普通交易';
    case 3:
      return '抢单兑出';
    case 4:
      return '抢单兑入';
    case 5:
      return '派单兑入';
    case 6:
      return '派单兑出';
  }
};
Vue.filter('advTypeFilter', advTypeFilter);

export const payTypeFilter = (value) => {
  switch (value) {
    case 1:
      return '银行卡';
    case 2:
      return '支付宝';
    case 3:
      return '微信';
    case 4:
      return '宝转卡';
  }
};
Vue.filter('payTypeFilter', payTypeFilter);
