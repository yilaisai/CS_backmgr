/**
 *  Created by   阿紫
 *  On  2018/8/8
 *  Content
 */

const Index = () => import('@/pages/home');
const Login = () => import('@/pages/login/index');

import systemRouter from './routers/system'  //系统页面
import money from './routers/money'   //资金管理
import merchant from './routers/merchant'  //商户服务
import operation from './routers/operation'  //运营管理
import user from './routers/user'  //用户管理

export const appRouter = [
	...systemRouter,
	...money,
	...merchant,
  ...operation,
  ...user,
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
    path: '/batchOut',
    name: 'batchOut',
    redirect: '/batchOut/record',
    meta: {
      title: '代付管理',
    },
    component: Index,
    children: [
      {
        path: '/batchOut/record',
        name: 'batchOutRecord',
        meta: {
          title: '代付记录',
        },
        component: () => import('@/pages/batchOut/record.vue'),
      },{
        path: '/batchOut/verify',
        name: 'batchOutVerify',
        meta: {
          title: '待处理申请',
        },
        component: () => import('@/pages/batchOut/verify.vue'),
      },
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
      ],
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
        path: 'assetCertification',
        name:'assetCertification',
        meta: {
          title: '资产证明管理',
        },
        component:() => import('@/pages/LegalCurrency/assetCertification'),
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
  // {
	//   path: '/blockchain',
	//   name: 'blockchain',
	//   redirect: '/blockchain/withdraw-check',
	//   meta: {
	// 	  title: '区块链监控'
	//   },
	//   component: Index,
	//   children: [
	// 	  {
	// 		  path: 'withdraw-check',
	// 		  name: 'withdrawCheck',
	// 		  meta: {
	// 			  title: '提币审核'
	// 		  },
	// 		  component: () => import('@/pages/withdraw-check/index.vue')
	// 	  },
	// 	  {
	// 		path: 'blockchain-statistics',
	// 		name: 'blockchainStatistics',
	// 		meta: {
	// 			title: '区块链统计'
	// 		},
	// 		component: () => import('@/pages/blockchain-statistics/index.vue')
	// 	  }
	//   ]
  // },
  // {
	//   path: '/merchant',
	//   name: 'merchant',
	//   redirect: '/merchant/merchantList',
	//   meta: {
	// 	  title: '商户模块'
	//   },
	//   component: Index,
	//   children: [
	// 	  {
	// 		  path: 'merchantList',
	// 		  name: 'merchantList',
	// 		  meta: {
	// 			  title: '商户注册申请'
	// 		  },
	// 		  component: () => import('@/pages/merchant/index.vue')
  //     },{
	// 		  path: 'merchantDetaile',
	// 		  name: 'merchantDetaile',
	// 		  meta: {
	// 			  title: '商户详情'
	// 		  },
	// 		  component: () => import('@/pages/merchant/merchantDetaile.vue')
  //     },{
	// 		  path: 'cashOutVerify',
	// 		  name: 'cashOutVerify',
	// 		  meta: {
	// 			  title: '交易广告列表'
	// 		  },
	// 		  component: () => import('@/pages/merchant/cashOutVerify.vue')
  //     },
      
  //     {
	// 		  path: 'merchantTradingFlow',
	// 		  name: 'merchantTradingFlow',
	// 		  meta: {
	// 			  title: '宝转卡流水'
	// 		  },
	// 		  component: () => import('@/pages/merchant/tradingFlow.vue')
  //     }
  //     ,{
	// 		  path: 'merchantTradingFlowDetaile',
	// 		  name: 'merchantTradingFlowDetaile',
	// 		  meta: {
	// 			  title: '商户交易流水详情'
	// 		  },
	// 		  component: () => import('@/pages/merchant/tradingFlowDetaile.vue')
  //     },
  //     {
	// 		  path: 'AuthorizedMerchant',
	// 		  name: 'AuthorizedMerchant',
	// 		  meta: {
	// 			  title: '商户分组授权'
	// 		  },
	// 		  component: () => import('@/pages/merchant/AuthorizedMerchant/index.vue')
  //     },
  //     {
	// 		  path: 'AuthorizedMerchantInfo',
	// 		  name: 'AuthorizedMerchantInfo',
	// 		  meta: {
	// 			  title: '授权分组信息'
	// 		  },
	// 		  component: () => import('@/pages/merchant/AuthorizedMerchant/info.vue')
  //     },
  //     {
	// 		  path: 'merchantBlacklist',
	// 		  name: 'merchantBlacklist',
	// 		  meta: {
	// 			  title: '商户用户黑名单'
	// 		  },
	// 		  component: () => import('@/pages/merchant/blacklist.vue')
  //     },
      
  //     {
	// 		  path: 'addAuthorizedMerchant',
	// 		  name: 'addAuthorizedMerchant',
	// 		  meta: {
	// 			  title: '新增授权分组'
	// 		  },
	// 		  component: () => import('@/pages/merchant/AuthorizedMerchant/addAuthorizedMerchant.vue')
  //     },
      
  //   ]
  // },
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
    path: '/riskManage',
    name: 'riskManage',
    redirect: '/riskManage/index',
    meta: {
      title: '风控设置',
    },
    component: Index,
    children: [
      {
        path: 'index',
        name: 'index',
        meta: {
          title: '风控设置',
        },
        component: () => import('@/pages/risk-manage/index.vue'),
      }
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
