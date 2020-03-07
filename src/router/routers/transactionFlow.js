
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
				path: 'invite',
				name: 'invite',
				meta: { title: '邀请关系' },
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

export default transactionFlow