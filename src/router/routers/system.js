/**
 * 系统模块
 */
const Index = () => import('@/pages/home')
const system = [
	{
		path: '/system',
		name: 'system',
		redirect: '/system/routerlist',
		meta: { title: '系统'},
		component: Index,
		children: [
			{
				path: 'routerlist',
				name: 'routerList',
				meta: { title: '系统路由列表' },
				component: () => import('@/pages/system/router-list')
			},
			{
        path: 'domainNameList',
        name: 'domainNameList',
        meta: {
          title: '域名管理',
        },
        component: () => import('@/pages/system/domainNameList'),
			},
			{
        path: 'menuManagement',
        name: 'menuManagement',
        meta: {
          title: '功能管理',
        },
        component: () => import('@/pages/system/menu-management'),
			},
			{
        path: 'roleManagement',
        name: 'roleManagement',
        meta: {
          title: '角色管理',
        },
        component: () => import('@/pages/system/role-management'),
			},
			{
        path: 'userManagement',
        name: 'userManagement',
        meta: {
          title: '用户管理',
        },
        component: () => import('@/pages/system/user-management'),
      },
      {
        path: 'remindSetting',
        name: 'remindSetting',
        meta: {
          title: '提醒设置',
        },
        component: () => import('@/pages/system/remind-setting'),
      },
      
      // {
      //   path: 'role',
      //   name: 'role',
      //   meta: {
      //     title: '角色管理',
      //   },
      //   component: () => import('@/pages/system/role.vue'),
      // }, {
      //   path: 'userManagement',
      //   name: 'userManagement',
      //   meta: {
      //     title: '用户管理',
      //   },
      //   component: () => import('@/pages/system/user.vue'),
      // }
		]
	}
]

export default system