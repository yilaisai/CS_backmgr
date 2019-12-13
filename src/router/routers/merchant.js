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
			}
		]
	}
]

export default merchant