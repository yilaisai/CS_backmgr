/**
 *  Created by   阿紫
 *  On  2018/8/8
 *  Content
 */

const Index = () => import('@/pages/home');
const Login = () => import('@/pages/login/index');

import systemRouter from './routers/system'  //系统页面
import brm from './routers/brm'   //资金管理
import merchant from './routers/merchant'  //商户服务
import operation from './routers/operation'  //运营管理

export const appRouter = [
	...systemRouter,
	...brm,
	...merchant,
	...operation,
  {
    path: '/',
    name: 'Index',
    redirect: '/home',
    meta: {
      title: '首页',
    },
    component: Index,
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '首页',
        },
        component: () => import('@/pages/home/home.vue'),
      },
    ],
  },
  {
    path: '/user',
    name: 'user',
    redirect: '/user/query',
    meta: {
      title: '用户管理',
    },
    component: Index,
    children: [
      {
        path: 'query',
        name: 'query',
        meta: {
          title: '用户查询',
        },
        component: () => import('@/pages/user/query.vue'),
      },
      {
        path: 'query-details',
        name: 'queryDetails',
        meta: {
          title: '用户查询详情',
        },
        component: () => import('@/pages/user/query-details.vue'),
      }
    ],
  },
  {
    path: '/permissions',
    name: 'permissions',
    redirect: '/permissions/menu',
    meta: {
      title: '权限管理',
    },
    component: Index,
    children: [
      {
        path: 'menu',
        name: 'menu',
        meta: {
          title: '功能管理',
        },
        component: () => import('@/pages/permissions/menu.vue'),
      },
      {
        path: 'role',
        name: 'role',
        meta: {
          title: '角色管理',
        },
        component: () => import('@/pages/permissions/role.vue'),
      }, {
        path: 'userManagement',
        name: 'userManagement',
        meta: {
          title: '用户管理',
        },
        component: () => import('@/pages/permissions/user.vue'),
      }],
  },
  {
    path: '/LegalCurrency',
    name: 'LegalCurrency',
    redirect: '/LegalCurrency/complaint',
    meta: {
      title: '法币交易',
    },
    component: Index,
    children: [
      {
        path: 'verify',
        name:'verify',
        meta: {
          title: '审核模块',
        },
        component:() => import('@/pages/LegalCurrency/verify/accountsReceivable.vue'),
      },
      {
        path: 'LegalCurrencySetting',
        name:'LegalCurrencySetting',
        meta: {
          title: '法币设置',
        },
        component:() => import('@/pages/LegalCurrency/LegalCurrencySetting.vue'),
      },
      {
        path: 'userQuery',
        name:'userQuery',
        meta: {
          title: '用户查询',
        },
        component:() => import('@/pages/LegalCurrency/userQuery/index.vue'),
      },
      {
        path: 'userQueryDetaile',
        name:'userQueryDetaile',
        meta: {
          title: '查看用户详情',
        },
        component:() => import('@/pages/LegalCurrency/userQuery/detaile.vue'),
      },
      {
        path: 'tradingFlow',
        name:'tradingFlow',
        meta: {
          title: '交易流水',
        },
        component:() => import('@/pages/LegalCurrency/tradingFlow/index.vue'),
      },
      {
        path: 'accountsReceivable',
        name:'accountsReceivable',
        meta: {
          title: '支付方式审核',
        },
        component: () => import('@/pages/LegalCurrency/verify/accountsReceivable.vue'),
      },
      {
        path: 'accountsReceivableDetaile',
        name:'accountsReceivableDetaile',
        meta: {
          title: '支付方式-详情',
        },
        component: () => import('@/pages/LegalCurrency/verify/accountsReceivableDetaile.vue'),
      },
      {
        path: 'complaint',
        name:'complaint',
        meta: {
          title: '投诉管理',
        },
        component: () => import('@/pages/LegalCurrency/complaint.vue'),
      },
      {
        path: 'LegalCurrencyTop',
        name:'LegalCurrencyTop',
        meta: {
          title: '法币资产排名',
        },
        component: () => import('@/pages/LegalCurrency/leaderboard/LegalCurrencyTop.vue'),
      },
      {
        path: 'personalAssets',
        name:'personalAssets',
        meta: {
          title: '个人资产',
        },
        component: () => import('@/pages/LegalCurrency/leaderboard/personalAssets.vue'),
      },
      {
        path: 'billingRecord',
        name:'billingRecord',
        meta: {
          title: '账单流水',
        },
        component: () => import('@/pages/LegalCurrency/leaderboard/billingRecord.vue'),
      },
      {
        path: 'customer-log',
        name:'customer-log',
        meta: {
          title: '投诉管理-查看客服操作日志',
        },
        component: () => import('@/pages/LegalCurrency/customer-log.vue'),
      },
      {
        path: 'complaint-details',
        name:'complaint-details',
        meta: {
          title: '投诉管理-查看详情',
        },
        component: () => import('@/pages/LegalCurrency/complaint-details.vue'),
      },
      {
        path: 'complaint-more',
        name: 'complaint-more',
        meta: {
          title: '投诉管理-查看更多',
        },
        component: () => import('@/pages/LegalCurrency/complaint-more.vue'),
      },
      {
        path: 'userProcessing',
        name: 'userProcessing',
        meta: {
          title: '用户处理',
        },
        component: () => import('@/pages/user/user-processing.vue'),
      },
      {
        path: 'user-history',
        name: 'user-history',
        meta: {
          title: '用户处理-查看用户历史处理记录',
        },
        component: () => import('@/pages/user/user-history.vue'),
      },
      {
        path: 'merchantAudit',
        name: 'merchantAudit',
        meta: {
          title: '广告商审核',
        },
        component: () => import('@/pages/merchant-audit/index'),
      },
      {
        path: 'transactionDetails',
        name: 'transactionDetails',
        meta: {
          title: '交易详情',
        },
        component: () => import('@/pages/transaction/transaction-details.vue'),
      }, 
    ],
  },
  {
	  path: '/blockchain',
	  name: 'blockchain',
	  redirect: '/blockchain/withdraw-check',
	  meta: {
		  title: '区块链监控'
	  },
	  component: Index,
	  children: [
		  {
			  path: 'withdraw-check',
			  name: 'withdrawCheck',
			  meta: {
				  title: '提币审核'
			  },
			  component: () => import('@/pages/withdraw-check/index.vue')
		  },
		  {
			path: 'blockchain-statistics',
			name: 'blockchainStatistics',
			meta: {
				title: '区块链统计'
			},
			component: () => import('@/pages/blockchain-statistics/index.vue')
		  }
	  ]
  },
  {
	  path: '/merchant',
	  name: 'merchant',
	  redirect: '/merchant/merchantList',
	  meta: {
		  title: '商户模块'
	  },
	  component: Index,
	  children: [
		  {
			  path: 'merchantList',
			  name: 'merchantList',
			  meta: {
				  title: '商户注册申请'
			  },
			  component: () => import('@/pages/merchant/index.vue')
      },{
			  path: 'merchantDetaile',
			  name: 'merchantDetaile',
			  meta: {
				  title: '商户详情'
			  },
			  component: () => import('@/pages/merchant/merchantDetaile.vue')
      },{
			  path: 'cashOutVerify',
			  name: 'cashOutVerify',
			  meta: {
				  title: '兑出单审核列表'
			  },
			  component: () => import('@/pages/merchant/cashOutVerify.vue')
      },
      
      {
			  path: 'merchantTradingFlow',
			  name: 'merchantTradingFlow',
			  meta: {
				  title: '商户交易流水'
			  },
			  component: () => import('@/pages/merchant/tradingFlow.vue')
      }
      ,{
			  path: 'merchantTradingFlowDetaile',
			  name: 'merchantTradingFlowDetaile',
			  meta: {
				  title: '商户交易流水详情'
			  },
			  component: () => import('@/pages/merchant/tradingFlowDetaile.vue')
      }
    ]
  },
  {
    path: '/money',
    name: 'money',
    redirect: '/money/transfer-approval',
    meta: {
      title: '资金管理',
    },
    component: Index,
    children: [
      {
        path: 'transfer-approval',
        name: 'transferApproval',
        meta: {
          title: '转账审批',
        },
        component: () => import('@/pages/money/transfer-approval.vue'),
      },
      {
        path: 'capitalFlow',
        name: 'capitalFlow',
        meta: {
          title: '资金流水',
        },
        component: () => import('@/pages/money/capitalFlow.vue'),
      },
      {
        path: 'capitalFlow2',
        name: 'capitalFlow2',
        meta: {
          title: '资金流水',
        },
        component: () => import('@/pages/money/capitalFlow2.vue'),
      },
      {
        path: 'ranking',
        name: 'ranking',
        meta: {
          title: '资产排行',
        },
        component: () => import('@/pages/money/ranking.vue'),
      },
      {
        path: 'transfer-query',
        name: 'transferQuery',
        meta: {
          title: '转账记录',
        },
        component: () => import('@/pages/money/transfer-query.vue'),
      },
      {
        path: 'statements',
        name: 'statements',
        meta: {
          title: '对账单',
        },
        component: () => import('@/pages/money/statements.vue'),
      },
      {
        path: 'red-envelope',
        name: 'red-envelope',
        meta: {
          title: '红包查询',
        },
        component: () => import('@/pages/money/red-envelope.vue'),
      },
      {
        path: 'red-envelope-detail',
        name: 'red-envelope-detail',
        meta: {
          title: '红包查询详情',
        },
        component: () => import('@/pages/money/red-envelope-detail.vue'),
      },


      /* {
        path: 'asset-overview',
        name: 'asset-overview',
        meta: {
          title: '资产总览',
        },
        component: () => import('@/pages/money/asset-overview.vue'),
      },
      {
        path: 'collapse-record',
        name: 'collapse-record',
        meta: {
          title: '归拢记录',
        },
        component: () => import('@/pages/money/collapse-record.vue'),
      },
      {
        path: 'daily-schedule',
        name: 'daily-schedule',
        meta: {
          title: '日总表统计图',
        },
        component: () => import('@/pages/money/daily-schedule.vue'),
      },
      {
        path: 'daily-chart',
        name: 'daily-chart',
        meta: {
          title: '日总表统计图(图表)',
        },
        component: () => import('@/pages/money/daily-chart.vue'),
      }, */
      {
        path: 'money-monitor',
        name: 'moneyMonitor',
        meta: {
          title: '资金监控',
        },
        component: () => import('@/pages/money/money-monitor.vue'),
      },
      {
        path: 'reconciliation',
        name: 'reconciliation',
        meta: {
          title: '总额对账',
        },
        component: () => import('@/pages/money/reconciliation.vue'),
      },
      {
        path: 'getBlockChainRecd',
        name: 'getBlockChainRecd',
        meta: {
          title: '链上到账审批',
        },
        component: () => import('@/pages/money/getBlockChainRecd.vue'),
      },
    ],
  },
  {
    path: '/third-application',
    name: 'third-application',
    redirect: '/third-application/created',
    meta: {
      title: '第三方应用管理',
    },
    component: Index,
    children: [
      {
        path: 'created',
        name: 'created',
        meta: {
          title: '应用管理',
        },
        component: () => import('@/pages/third-application/created.vue'),
      },
      {
        path: 'third-modify',
        name: 'thirdModify',
        meta: {
          title: '应用修改和新增',
        },
        component: () => import('@/pages/third-application/third-modify.vue'),
      },
      {
        path: 'third-detail',
        name: 'thirdDetail',
        meta: {
          title: '应用详情',
        },
        component: () => import('@/pages/third-application/third-detail.vue'),
      },
      {
        path: 'check-application',
        name: 'check-application',
        meta: {
          title: '审核管理',
        },
        component: () => import('@/pages/third-application/check-application.vue'),
      },
      {
        path: 'shelf-application',
        name: 'shelfApplication',
        meta: {
          title: '已上架应用',
        },
        component: () => import('@/pages/third-application/shelf-application.vue'),
      }, {
        path: 'application-details',
        name: 'applicationDetails',
        meta: {
          title: '已上架应用详情',
        },
        component: () => import('@/pages/third-application/application-details.vue'),
      }],
  },
  {
    path: '/banner',
    name: 'banner',
    redirect: '/banner/banner',
    meta: {
      title: '轮播图管理',
    },
    component: Index,
    children: [
      {
        path: 'banner',
        meta: {
          title: '轮播图管理',
        },
        component: () => import('@/pages/banner/banner.vue'),
      },
    ],
  },
  {
    path: '/currency-increase',
    name: 'currencyIncrease',
    redirect: '/currency-increase/activity',
    meta: {
      title: '增币计划管理',
    },
    component: Index,
    children: [
      {
        path: 'activity',
        name: 'activity',
        meta: {
          title: '活动管理',
        },
        component: () => import('@/pages/currency-increase/activity.vue'),
      },
      {
        path: 'position-record',
        name: 'positionRecord',
        meta: {
          title: '持仓记录查询',
        },
        component: () => import('@/pages/currency-increase/position-record.vue'),
      },
      {
        path: 'out-record',
        name: 'outRecord',
        meta: {
          title: '出仓记录查询',
        },
        component: () => import('@/pages/currency-increase/out-record.vue'),
      }
    ],
  },
  {
    path: '/message',
    name: 'message',
    redirect: '/message/message',
    meta: {
      title: '消息推送管理',
    },
    component: Index,
    children: [
      {
        path: 'message',
        meta: {
          title: '客户端推送',
        },
        component: () => import('@/pages/message/message.vue'),
      },
      {
        path: 'sms-push',
        meta: {
          title: '短信推送',
        },
        component: () => import('@/pages/message/sms-push.vue'),
      },
      {
        path: 'messageDetails',
        name: 'messageDetails',
        meta: {
          title: '消息推送详情',
        },
        component: () => import('@/pages/message/messageDetails.vue'),
      },
      {
        path: 'sms-pushDetails',
        name: 'sms-pushDetails',
        meta: {
          title: '短信推送详情',
        },
        component: () => import('@/pages/message/sms-pushDetails.vue'),
      },
    ],
  },
  {
    path: '/feedback',
    name: 'feedback',
    redirect: '/feedback/feedback',
    meta: {
      title: '意见反馈管理',
    },
    component: Index,
    children: [
      {
        path: 'feedback',
        meta: {
          title: '意见反馈管理',
        },
        component: () => import('@/pages/feedback/feedback.vue'),
      },
      {
        path: 'feedbackDetails',
        name: 'feedbackDetails',
        meta: {
          title: '意见反馈详情',
        },
        component: () => import('@/pages/feedback/feedbackDetails.vue'),
      },
    ],
  },
  {
    path: '/configurable',
    name: 'configurable',
    redirect: '/configurable/currency',
    meta: {
      title: '可配数据管理',
    },
    component: Index,
    children: [
      {
        path: 'currency',
        name: 'currency',
        meta: {
          title: '币种设置',
        },
        component: () => import('@/pages/configurable/currency.vue'),
      },
      {
        path: 'currency-set',
        name: 'currencySet',
        meta: {
          title: '新增修改币种',
        },
        component: () => import('@/pages/configurable/currency-set.vue'),
      },
      {
        path: 'calculate',
        name: 'calculate',
        meta: {
          title: '算力规则',
        },
        component: () => import('@/pages/configurable/calculate.vue'),
      },
      {
        path: 'send-money',
        name: 'sendMoney',
        meta: {
          title: '邀请规则',
        },
        component: () => import('@/pages/configurable/send-money.vue'),
      },
      {
        path: 'collect-alarm',
        name: 'collectAlarm',
        meta: {
          title: '收告警短信设置',
        },
        component: () => import('@/pages/configurable/collect-alarm.vue'),
      },
      {
        path: 'system-params',
        name: 'system-params',
        meta: {
          title: '系统参数',
        },
        component: () => import('@/pages/configurable/system-params.vue'),
      },
      {
        path: 'client',
        name: 'client',
        meta: {
          title: '客户端版本',
        },
        component: () => import('@/pages/configurable/client.vue'),
      }
    ],
  },
  {
    path: '/identity',
    name: 'identity',
    redirect: '/identity/identity',
    meta: {
      title: '身份审核',
    },
    component: Index,
    children: [
      {
		name: 'identity',
        path: 'identity',
        meta: {
          title: '实名审核',
        },
        component: () => import('@/pages/identity/identity.vue'),
      },
      {
        path: 'identity-modify',
        name: 'identityModify',
        meta: {
          title: '身份信息修改',
        },
        component: () => import('@/pages/identity/identity-modify.vue'),
      },
      {
        path: 'identity-details',
        name: 'identityDetails',
        meta: {
          title: '实名审核详情',
        },
        component: () => import('@/pages/identity/identity-details.vue'),
      },
    ],
  },
  {
    path: '/asset-statistics',
    name: 'asset-statistics',
    redirect: '/asset-statistics/asset-overview',
    meta: {
      title: '资产统计',
    },
    component: Index,
    children: [
      {
        path: 'asset-overview',
        name: 'asset-overview',
        meta: {
          title: '资产总览',
        },
        component: () => import('@/pages/asset-statistics/asset-overview.vue'),
      },
      {
        path: 'collapse-record',
        name: 'collapse-record',
        meta: {
          title: '归拢记录',
        },
        component: () => import('@/pages/asset-statistics/collapse-record.vue'),
      },
      {
        path: 'daily-schedule',
        name: 'daily-schedule',
        meta: {
          title: '日总表统计图',
        },
        component: () => import('@/pages/asset-statistics/daily-schedule.vue'),
      },
      {
        path: 'daily-chart',
        name: 'daily-chart',
        meta: {
          title: '日总表统计图(图表)',
        },
        component: () => import('@/pages/asset-statistics/daily-chart.vue'),
      },
    ],
  },
  {
    path: '/invite',
    name: 'invite',
    redirect: '/invite/invite',
    meta: {
      title: '邀请关系',
    },
    component: Index,
    children: [
      {
		name: 'invite222',
        path: 'invite',
        meta: {
          title: '邀请关系',
        },
        component: () => import('@/pages/invite/invite.vue'),
      },
    ],
  },
  {
    path: '/static',
    name: 'static',
    redirect: '/static/title',
    meta: {
      title: '静态页面编辑器',
    },
    component: Index,
    children: [
      {
        path: 'title',
        name: 'title',
        meta: {
          title: '静态页面编辑器',
        },
        component: () => import('@/pages/static/title.vue'),
      },
      {
        path: 'addnews',
        name: 'addnews',
        meta: {
          title: '静态页面编辑器'
        },
        component: () => import('@/pages/static/add-news.vue')
      }
    ],
  },
  {
    path: '/supersac',
    name: 'supersac',
    redirect: '/supersac/list',
    meta: {
      title: '超级节点配置',
    },
    component: Index,
    children: [
      {
        path: 'list',
        name: 'list',
        meta: {
          title: '超级节点配置',
        },
        component: () => import('@/pages/supersac/list.vue'),
      },
      {
        path: 'setprize',
        name: 'setprize',
        meta: {
          title: '超级节点配置'
        },
        component: () => import('@/pages/supersac/set-prize.vue')
      },
      {
        path: 'setbill',
        name: 'set-bill',
        meta: {
          title: '超级节点配置'
        },
        component: () => import('@/pages/supersac/set-bill.vue')
      },
      {
        path: 'setincome',
        name: 'set-income',
        meta: {
          title: '超级节点配置'
        },
        component: () => import('@/pages/supersac/set-income.vue')
      },
      {
        path: 'user',
        name: 'supersacUser',
        meta: {
          title: '用户管理'
        },
        component: () => import('@/pages/supersac/user.vue')
      },
      {
        path: 'invite-detail',
        name: 'invite-detail',
        meta: {
          title: '邀请详情'
        },
        component: () => import('@/pages/supersac/invite-detail.vue')
      },
      // {
      //   path: 'node-detail',
      //   name: 'node-detail',
      //   meta: {
      //     title: '节点管理'
      //   },
      //   component: () => import('@/pages/supersac/node-detail.vue')
      // },
      {
        path: 'node-modify',
        name: 'nodeModify',
        meta: {
          title: '节点新增和修改'
        },
        component: () => import('@/pages/supersac/node-modify.vue')
      },
      {
        path: 'sendEmail',
        name: 'sendEmail',
        meta: {
          title: '发送邮件'
        },
        component: () => import('@/pages/supersac/sendEmail.vue')
      },
      {
        path: 'node-manage',
        name: 'node-manage',
        meta: {
          title: '节点管理'
        },
        component: () => import('@/pages/supersac/node-manage.vue')
      },
      {
        path: 'banner',
        name: 'supersacBanner',
        meta: {
          title: 'banner管理'
        },
        component: () => import('@/pages/supersac/banner.vue')
      },
      {
        path: 'money-manage',
        name: 'money-manage',
        meta: {
          title: '资金管理'
        },
        component: () => import('@/pages/supersac/money-manage.vue')
      },
      {
        path: 'notice-manage',
        name: 'notice-manage',
        meta: {
          title: '公告管理'
        },
        component: () => import('@/pages/supersac/notice-manage.vue')
      }, {
        path: 'revenue-management',
        name: 'revenueManagement',
        meta: {
          title: '收益管理'
        },
        component: () => import('@/pages/supersac/revenue-management.vue')
      }, {
        path: 'team-ranking',
        name: 'teamRanking',
        meta: {
          title: '团队排行'
        },
        component: () => import('@/pages/supersac/team-ranking.vue')
      }
    ],
  },
  {
    path: '/finances',
    name: 'finances',
    redirect: '/finances/index',
    meta: {
      title: '理财管理',
    },
    component: Index,
    children: [
      {
        path: 'index',
        name: 'index',
        meta: {
          title: '理财管理',
        },
        component: () => import('@/pages/finances/index.vue'),
      }
    ],
  },
  {
    path: '/brushList',
    name: 'brushList',
    redirect: '/brushList/brushUser',
    meta: {
      title: '代理刷单',
    },
    component: Index,
    children: [
      {
        path: 'brushUser',
        name: 'brushUser',
        meta: {
          title: '用户管理',
        },
        component: () => import('@/pages/brush-list/user.vue'),
      },
      {
        path: 'margin',
        name: 'margin',
        meta: {
          title: '保证金',
        },
        component: () => import('@/pages/brush-list/margin.vue'),
      },
      {
        path: 'flow',
        name: 'flow',
        meta: {
          title: '刷单流水',
        },
        component: () => import('@/pages/brush-list/flow.vue'),
      },
      {
        path: 'ruleSetting',
        name: 'ruleSetting',
        meta: {
          title: '返佣规则设置',
        },
        component: () => import('@/pages/brush-list/ruleSetting.vue'),
      },
      {
        path: 'account',
        name: 'account',
        meta: {
          title: '刷单账户管理',
        },
        component: () => import('@/pages/brush-list/account.vue'),
      },
    ],
  }
];

export default [
  ...appRouter,
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
    },
    component: Login,
  },
  {
    path: '/404',
    name: 'NotFound',
    alias: '*',
    meta: {
      title: '404 - 找不到页面',
    },
    component: {
      render(h) {
        return h('h1', {
          attrs: {
            style: 'text-align: center;',
          },
        }, '页面不存在');
      },
    },
  },
];
