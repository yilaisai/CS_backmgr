
/**
 * 交易流水
 */
const Index = () => import('@/pages/home')
const transactionFlow = [
	{
		path: '/transactionFlow',
		name: 'transactionFlow',
		redirect: '/transactionFlow/CashIn',
		meta: { title: '交易流水'},
		component: Index,
		children: [
			{
				path: 'CashIn',
				name: 'CashIn',
				meta: { title: '兑入流水' },
				component: () => import('@/pages/transactionFlow/CashIn')
			},
			{
				path: 'CashOut',
				name: 'CashOut',
				meta: { title: '兑出流水' },
				component: () => import('@/pages/transactionFlow/CashOut')
			},
			{
				path: 'recharge',
				name: 'recharge',
				meta: { title: '充值记录' },
				component: () => import('@/pages/transactionFlow/recharge')
			},
			{
				path: 'extract',
				name: 'extract',
				meta: { title: '提取记录' },
				component: () => import('@/pages/transactionFlow/extract')
			}
		]
	}
]

export default transactionFlow