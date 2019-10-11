/**
 * 资金管理
 */
const Index = () => import('@/pages/home')
const brm = [
	{
		path: '/brm',
		name: 'brm',
		redirect: '/brm/recharge-record',
		meta: { title: '资金管理'},
		component: Index,
		children: [
			{
				path: 'recharge-record',
				name: 'rechargeRecord',
				meta: { title: '充提记录' },
				component: () => import('@/pages/brm-recharge-record/index.vue')
			}
		]
	}
]

export default brm