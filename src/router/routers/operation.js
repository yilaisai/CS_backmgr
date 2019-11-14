/**
 * 运营管理模块
 */
const Index = () => import('@/pages/home')
const operation = [
	{
		path: '/operation',
		name: 'operation',
		redirect: '/operation/local-filtering',
		meta: { title: '运营管理'},
		component: Index,
		children: [
			{
				path: 'local-filtering',
				name: 'localFiltering',
				meta: { title: '地区访问设置' },
				component: () => import('@/pages/local-ip-filtering/index.vue')
			}
		]
	}
]

export default operation