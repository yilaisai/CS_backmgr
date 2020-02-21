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
				component: () => import('@/pages/operation/local-ip-filtering/index.vue')
			},
			{
        path: 'banner',
        meta: {
          title: '轮播图管理',
        },
        component: () => import('@/pages/operation/banner'),
			},
			{
        path: 'clientPush',
        meta: {
          title: '客户端推送',
        },
        component: () => import('@/pages/operation/client-push/index'),
      },
      {
        path: 'clientPushDetail',
        name: 'clientPushDetail',
        meta: {
          title: '客户端推送详情',
        },
        component: () => import('@/pages/operation/client-push/detail'),
			},
			{
        path: 'smsPush',
        meta: {
          title: '短信推送',
        },
        component: () => import('@/pages/operation/sms-push/index'),
      },
      {
        path: 'smsPushDetail',
        name: 'smsPushDetail',
        meta: {
          title: '短信推送详情',
        },
        component: () => import('@/pages/operation/sms-push/detail'),
			},
			{
        path: 'feedback',
        meta: {
          title: '意见反馈',
        },
        component: () => import('@/pages/operation/feedback/index'),
			},
			{
				path: 'feedbackDetail',
				name:'feedbackDetail',
        meta: {
          title: '意见反馈详情',
        },
        component: () => import('@/pages/operation/feedback/detail'),
			},
			{
        path: 'staticPage',
        name: 'staticPage',
        meta: {
          title: '静态页面编辑',
        },
        component: () => import('@/pages/operation/static-page/index'),
      },
      {
        path: 'addStaticPage',
        name: 'addStaticPage',
        meta: {
          title: '添加'
        },
        component: () => import('@/pages/operation/static-page/add')
      }
		]
	}
]

export default operation