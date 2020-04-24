/**
 *  Created by   阿紫
 *  On  2018/8/8
 *  Content
 */

const Index = () => import('@/pages/home');
const Login = () => import('@/pages/login/index');

import systemRouter from './routers/system'  //系统页面
import money from './routers/money'   //资金管理
import merchant from './routers/merchant'  //商户服务
import operation from './routers/operation'  //运营管理
import user from './routers/user'  //用户管理
import LegalCurrency from './routers/LegalCurrency'  //法币管理
import transactionFlow from './routers/transactionFlow'  //交易流水
import report from './routers/report'  //报表管理

export const appRouter = [
	...systemRouter,
	...money,
	...merchant,
  ...operation,
  ...user,
  ...LegalCurrency,
  ...transactionFlow,
  ...report,
  {
    path: '/',
    name: 'Index',
    redirect: '/home',
    meta: {
      title: '首页',
    },
    component: Index,
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '首页',
        },
        component: () => import('@/pages/home/home.vue'),
      },
    ],
  },
  {
    path: '/batchOut',
    name: 'batchOut',
    redirect: '/batchOut/record',
    meta: {
      title: '代付管理',
    },
    component: Index,
    children: [
      {
        path: '/batchOut/record',
        name: 'batchOutRecord',
        meta: {
          title: '代付记录',
        },
        component: () => import('@/pages/batchOut/record.vue'),
      },{
        path: '/batchOut/verify',
        name: 'batchOutVerify',
        meta: {
          title: '待处理申请',
        },
        component: () => import('@/pages/batchOut/verify.vue'),
      },
    ],
  },
  {
    path: '/permissions',
    name: 'permissions',
    redirect: '/permissions/menu',
    meta: {
      title: '权限管理',
    },
    component: Index,
    children: [
      ],
  },
  // {
  //   path: '/money',
  //   name: 'money',
  //   redirect: '/money/transfer-approval',
  //   meta: {
  //     title: '资金管理',
  //   },
  //   component: Index,
  //   children: [
  //     {
  //       path: 'money-monitor',
  //       name: 'moneyMonitor',
  //       meta: {
  //         title: '资金监控',
  //       },
  //       component: () => import('@/pages/money/money-monitor.vue'),
  //     },
  //     {
  //       path: 'reconciliation',
  //       name: 'reconciliation',
  //       meta: {
  //         title: '总额对账',
  //       },
  //       component: () => import('@/pages/money/reconciliation.vue'),
  //     },
  //     {
  //       path: 'getBlockChainRecd',
  //       name: 'getBlockChainRecd',
  //       meta: {
  //         title: '链上到账审批',
  //       },
  //       component: () => import('@/pages/money/getBlockChainRecd.vue'),
  //     },
  //   ],
  // },
  {
    path: '/riskManage',
    name: 'riskManage',
    redirect: '/riskManage/index',
    meta: {
      title: '风控设置',
    },
    component: Index,
    children: [
      {
        path: 'index',
        name: 'index',
        meta: {
          title: '风控设置',
        },
        component: () => import('@/pages/risk-manage/index.vue'),
      }
    ],
  }
];

export default [
  ...appRouter,
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
    },
    component: Login,
  },
  {
    path: '/404',
    name: 'NotFound',
    alias: '*',
    meta: {
      title: '404 - 找不到页面',
    },
    component: {
      render(h) {
        return h('h1', {
          attrs: {
            style: 'text-align: center;',
          },
        }, '页面不存在');
      },
    },
  },
];
