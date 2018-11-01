/**
 *  Created by   阿紫
 *  On  2018/8/8
 *  Content
 */

import Vue from "vue";

export const convertTransactionType = (value) => {
  switch (value) {
    case 'inner':
      return '个人互转';
    case 'msend':
      return '转出商户';
    case 'mreceive':
      return '转入商户';
    case 'csend':
      return '链上转出';
    case 'creceive':
      return '链上转入';
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
