/**
 * 报表管理
 */
const Index = () => import('@/pages/home')
const report = [
	{
		path: '/report',
		name: 'report',
		redirect: '/report/AcceptanceReport',
		meta: { title: '报表管理'},
		component: Index,
		children: [
			{
				path: 'AcceptanceReport',
				name: 'AcceptanceReport',
				meta: { title: '交易员交易报表' },
				component: () => import('@/pages/report/AcceptanceReport')
      },
      {
				path: 'merchantReport',
				name: 'merchantReport',
				meta: { title: '商户数据交易报表' },
				component: () => import('@/pages/report/merchantReport')
			},
		]
	}
]

export default report