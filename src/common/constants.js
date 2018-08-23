// 交易类型
import Vue from 'vue';

export const transactionType = [{
  value: '',
  label: '全部',
}, {
  value: 'inner',
  label: '个人互转',
}, {
  value: 'msend',
  label: '转出商户',
}, {
  value: 'mreceive',
  label: '转入商户',
}, {
  value: 'csend',
  label: '链上转出',
}, {
  value: 'creceive',
  label: '链上转入',
}];


// 告警情况
export const alarmConditionType = [{
  value: 0,
  label: '审核告警',
}, {
  value: 1,
  label: '上链告警',
}, {
  value: 2,
  label: '到账延迟',
}];

// 转账记录查询 -- 状态
export const transferQueryStatus = [{
  value: '',
  label: '全部',
}, {
  value: '0',
  label: '失败',
}, {
  value: '1',
  label: '成功',
}, {
  value: '2',
  label: '待审核',
}, {
  value: '3',
  label: '审核不通过',
}, {
  value: '4',
  label: '审核通过',
}, {
  value: '5',
  label: '处理中',
}, {
  value: '7',
  label: '已发送',
}];

