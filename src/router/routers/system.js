/**
 * 系统模块
 */
const Index = () => import('@/pages/home')
const system = [
	{
		path: '/sys',
		name: 'sys',
		redirect: '/sys/routerlist',
		meta: { title: '系统'},
		component: Index,
		children: [
			{
				path: 'routerlist',
				name: 'routerList',
				meta: { title: '系统路由列表' },
				component: () => import('@/pages/router-list/index.vue')
			}
		]
	}
]

export default system