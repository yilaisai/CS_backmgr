/**
 * 资金管理
 */
const Index = () => import('@/pages/home')
const brm = [
	{
		path: '/money',
		name: 'money',
		redirect: '/money/recharge-record',
		meta: { title: '资金管理'},
		component: Index,
		children: [
			{
				path: 'recharge-record',
				name: 'rechargeRecord',
				meta: { title: '充提记录' },
				component: () => import('@/pages/money/brm-recharge-record/index.vue')
			},
			{
        path: 'transfer-approval',
        name: 'transferApproval',
        meta: {
          title: '转账审批',
        },
        component: () => import('@/pages/money/transfer-approval.vue'),
      },
      {
        path: 'currency',
        name: 'currency',
        meta: {
          title: '币种设置',
        },
        component: () => import('@/pages/money/currency.vue'),
      },
      {
        path: 'currency-set',
        name: 'currencySet',
        meta: {
          title: '新增修改币种',
        },
        component: () => import('@/pages/money/currency-set.vue'),
      },
      {
        path: 'capitalFlow',
        name: 'capitalFlow',
        meta: {
          title: '资金流水',
        },
        component: () => import('@/pages/money/capitalFlow.vue'),
      },
      {
        path: 'capitalFlow2',
        name: 'capitalFlow2',
        meta: {
          title: '资金流水',
        },
        component: () => import('@/pages/money/capitalFlow2.vue'),
      },
      {
        path: 'ranking',
        name: 'ranking',
        meta: {
          title: '资产排行',
        },
        component: () => import('@/pages/money/ranking.vue'),
      },
      {
        path: 'transfer-query',
        name: 'transferQuery',
        meta: {
          title: '转账记录',
        },
        component: () => import('@/pages/money/transfer-query.vue'),
      },
      {
        path: 'statements',
        name: 'statements',
        meta: {
          title: '对账单',
        },
        component: () => import('@/pages/money/statements.vue'),
      },
      {
        path: 'red-envelope',
        name: 'red-envelope',
        meta: {
          title: '红包查询',
        },
        component: () => import('@/pages/money/red-envelope.vue'),
      },
      {
        path: 'red-envelope-detail',
        name: 'red-envelope-detail',
        meta: {
          title: '红包查询详情',
        },
        component: () => import('@/pages/money/red-envelope-detail.vue'),
			},
			{
			  path: 'withdraw-check',
			  name: 'withdrawCheck',
			  meta: {
				  title: '提币审核'
			  },
			  component: () => import('@/pages/money/withdraw-check/index.vue')
			},
			{
				path: 'blockchain-statistics',
				name: 'blockchainStatistics',
				meta: {
					title: '区块链统计'
				},
				component: () => import('@/pages/money/blockchain-statistics/index.vue')
			}
		]
	}
]

export default brm