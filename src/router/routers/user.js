/**
 * 用户管理模块
 */
const Index = () => import('@/pages/home')
const user = [
	{
		path: '/user',
		name: 'user',
		redirect: '/user/query',
		meta: { title: '用户管理'},
		component: Index,
		children: [
			{
				path: 'query',
				name: 'query',
				meta: { title: '用户基本信息' },
				component: () => import('@/pages/user/query/list')
			},
			{
				path: 'queryDetail',
				name: 'queryDetail',
				meta: { title: '用户详情' },
				component: () => import('@/pages/user/query/detail')
			},
			{
				path: 'invite',
				name: 'invite',
				meta: { title: '代理管理' },
				component: () => import('@/pages/user/invite')
			},
			{
				path: 'identityVerify',
				name: 'identityVerify',
				meta: { title: '实名审核' },
				component: () => import('@/pages/user/identity/verify')
			},
      {
        path: 'identityModify',
        name: 'identityModify',
        meta: {
          title: '身份信息修改',
          noTab:true
        },
        component: () => import('@/pages/user/identity/modify'),
      },
      {
        path: 'identityDetails',
        name: 'identityDetails',
        meta: {
          title: '实名审核详情',
        },
        component: () => import('@/pages/user/identity/details'),
      },
			
		]
	}
]

export default user