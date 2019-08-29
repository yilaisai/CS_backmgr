// 交易类型
import Vue from 'vue';

export const transactionType = [{
  value: '1',
  label: '全部',
}, {
  value: '2',
  label: '充币',
}, {
  value: '3',
  label: '提币',
}, {
  value: '4',
  label: '站内互转',
}, {
  value: '5',
  label: '红包',
}, {
  value: '6',
  label: '划转',
}];
// 1 全部 All
// 2 充币 Recharge
// 3 提币 Withdraw
// 4 站内互转 Transfer
// 5 红包 RedEnvelope
// 6 划转 TransferSelf


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
  value: '6',
  label: '已支付',
}, {
  value: '7',
  label: '已发送',
}];

// 身份证审核
export const identityType = [{
  value: '',
  label: '全部',
}, {
  value: '1',
  label: '待审核',
}, {
  value: '2',
  label: '已审核',
}, {
  value: '3',
  label: '审核不通过',
}, {
  value: '4',
  label: '审核通过',
}];

// 应用类型
export const applicationType = [{
  value: '0',
  label: '游戏',
}, {
  value: '1',
  label: '社交',
}, {
  value: '2',
  label: '电商',
}, {
  value: '3',
  label: '平台',
}, {
  value: '4',
  label: '媒体',
}, {
  value: '5',
  label: '其它',
}];