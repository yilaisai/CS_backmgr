
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
			
		]
	}
]

export default transactionFlow