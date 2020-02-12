/**
 * 商户服务
 */
const Index = () => import('@/pages/home')
const merchant = [
	{
		path: '/merchant',
		name: 'merchant',
		redirect: '/merchant/user-query',
		meta: { title: '商户服务'},
		component: Index,
		children: [
			{
				path: 'user-query',
				name: 'merUserQuery',
				meta: { title: '商户查询' },
				component: () => import('@/pages/merchant/user-query/index.vue')
			},
			{
				path: 'user-details',
				name: 'merUserDetails',
				meta: { title: '商户详情' },
				component: () => import('@/pages/merchant/user-query/details.vue')
			},
			{
				path: 'recharge-record',
				name: 'merRechargeRecord',
				meta: { title: '充提记录' },
				component: () => import('@/pages/merchant/mer-recharge-record/index.vue')
			},
			{
				path: 'fund-record',
				name: 'merFundRecord',
				meta: { title: '资金流水' },
				component: () => import('@/pages/merchant/mer-fund-record/index.vue')
			},
			{
				path: 'init-settings',
				name: 'merInitSettings',
				meta: { title: '商户设置' },
				component: () => import('@/pages/merchant/init-settings/index.vue')
			},
			{
				path: 'merchantTradingFlow2',
				name: 'merchantTradingFlow2',
				meta: { title: '商户交易记录' },
				component: () => import('@/pages/merchant/tradingFlow_2.vue')
			},
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
						title: '交易广告列表'
					},
					component: () => import('@/pages/merchant/cashOutVerify.vue')
			},
			
			{
					path: 'merchantTradingFlow',
					name: 'merchantTradingFlow',
					meta: {
						title: '宝转卡流水'
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
			},
			{
					path: 'AuthorizedMerchant',
					name: 'AuthorizedMerchant',
					meta: {
						title: '商户分组授权'
					},
					component: () => import('@/pages/merchant/AuthorizedMerchant/index.vue')
			},
			{
					path: 'AuthorizedMerchantInfo',
					name: 'AuthorizedMerchantInfo',
					meta: {
						title: '授权分组信息'
					},
					component: () => import('@/pages/merchant/AuthorizedMerchant/info.vue')
			},
			{
					path: 'merchantBlacklist',
					name: 'merchantBlacklist',
					meta: {
						title: '商户用户黑名单'
					},
					component: () => import('@/pages/merchant/blacklist.vue')
			},
			
			{
					path: 'addAuthorizedMerchant',
					name: 'addAuthorizedMerchant',
					meta: {
						title: '新增授权分组'
					},
					component: () => import('@/pages/merchant/AuthorizedMerchant/addAuthorizedMerchant.vue')
			}
		]
	}
]

export default merchant