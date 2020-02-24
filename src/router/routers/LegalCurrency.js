/**
 * 法币管理模块
 */
const Index = () => import('@/pages/home')
const user = [
	{
		path: '/LegalCurrency',
		name: 'LegalCurrency',
		redirect: '/LegalCurrency/userQuery',
		meta: { title: '法币管理'},
		component: Index,
		children: [
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
      },{
        path: 'ranking',
        name:'LegalCurrencyRanking',
        meta: {
          title: '法币资产排名',
        },
        component: () => import('@/pages/LegalCurrency/ranking'),
			},
			{
        path: 'personalAssets',
        name:'personalAssets',
        meta: {
          title: '个人资产',
        },
        component: () => import('@/pages/LegalCurrency/personalAssets/index'),
			},
			{
        path: 'billingRecord',
        name:'billingRecord',
        meta: {
          title: '账单流水',
        },
        component: () => import('@/pages/LegalCurrency/personalAssets/billingRecord'),
      },
      {
        path: 'fundingRecords',
        name: 'LegalCurrencyFundingRecords',
        meta: {
          title: '资金流水',
        },
        component: () => import('@/pages/LegalCurrency/fundingRecords'),
			},
			{
        path: 'transactionRecord',
        name: 'LegalCurrencyTransactionRecord',
        meta: {
          title: '交易流水',
        },
        component: () => import('@/pages/LegalCurrency/transactionRecord'),
      },
      {
        path: 'complaint',
        name:'complaint',
        meta: {
          title: '投诉管理',
        },
        component: () => import('@/pages/LegalCurrency/complaint/index'),
			},
			{
        path: 'complaintDetails',
        name:'complaintDetails',
        meta: {
          title: '投诉管理-查看详情',
        },
        component: () => import('@/pages/LegalCurrency/complaint/details'),
      },{
        path: 'customer-log',
        name:'customer-log',
        meta: {
          title: '投诉管理-查看客服操作日志',
        },
        component: () => import('@/pages/LegalCurrency/complaint/customer-log'),
      },{
        path: 'complaint-more',
        name: 'complaint-more',
        meta: {
          title: '投诉管理-查看更多',
        },
        component: () => import('@/pages/LegalCurrency/complaint/more'),
      },
			{
        path: 'paymentMethodVerify',
        name:'paymentMethodVerify',
        meta: {
          title: '支付方式审核',
        },
        component: () => import('@/pages/LegalCurrency/paymentMethod/verify'),
      },
      {
        path: 'paymentMethodDetaile',
        name:'paymentMethodDetaile',
        meta: {
          title: '支付方式-详情',
        },
        component: () => import('@/pages/LegalCurrency/paymentMethod/details'),
      },
      {
        path: 'advertisersVerify',
        name: 'advertisersVerify',
        meta: {
          title: '广告商审核',
        },
        component: () => import('@/pages/LegalCurrency/advertisers/verify'),
      },
      {
        path: 'LegalCurrencySetting',
        name:'LegalCurrencySetting',
        meta: {
          title: '法币设置',
        },
        component:() => import('@/pages/LegalCurrency/setting'),
      },{
        path: 'assetCertification',
        name:'assetCertification',
        meta: {
          title: '资产证明管理',
        },
        component:() => import('@/pages/LegalCurrency/assetCertification'),
      },
			
		]
	}
]

export default user