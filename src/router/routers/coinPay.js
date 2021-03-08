/**
 * 币支付
 */
const Index = () => import('@/pages/home')
const report = [
	{
		path: '/coinPay',
		name: 'coinPay',
		redirect: '/coinPay/recordList',
		meta: { title: '币支付'},
		component: Index,
		children: [
			{
				path: 'recordList',
				name: 'recordList',
				meta: { title: '币支付流水' },
				component: () => import('@/pages/coinPay/recordList')
      },
			{
				path: 'monitor',
				name: 'monitor',
				meta: { title: '币支付充值监控' },
				component: () => import('@/pages/coinPay/monitor')
      },
		]
	}
]

export default report