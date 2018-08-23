/**
 *  Created by   阿紫
 *  On  2018/8/8
 *  Content
 */

const Index = () => import('@/pages/home');
const Login = () => import('@/pages/login/index');

export const appRouter = [
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
    path: '/user',
    name: 'user',
    redirect: '/user/query',
    meta: {
      title: '用户管理',
    },
    component: Index,
    children: [
      {
        path: 'query',
        name: 'query',
        meta: {
          title: '用户查询',
        },
        component: () => import('@/pages/user/query.vue'),
      },
      {
        path: 'query-details',
        name: 'queryDetails',
        meta: {
          title: '用户查询详情',
        },
        component: () => import('@/pages/user/query-details.vue'),
      },
      {
        path: 'ranking',
        name: 'ranking',
        meta: {
          title: '用户排行',
        },
        component: () => import('@/pages/user/ranking.vue'),
      }
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
      {
        path: 'menu',
        name: 'menu',
        meta: {
          title: '菜单管理',
        },
        component: () => import('@/pages/permissions/menu.vue'),
      },
      {
        path: 'role',
        name: 'role',
        meta: {
          title: '角色管理',
        },
        component: () => import('@/pages/permissions/role.vue'),
      },{
        path: 'userManagement',
        name: 'userManagement',
        meta: {
          title: '用户管理',
        },
        component: () => import('@/pages/permissions/user.vue'),
      }],
  },
  {
    path: '/money',
    name: 'money',
    redirect: '/money/transfer-approval',
    meta: {
      title: '资金管理',
    },
    component: Index,
    children: [
      {
        path: 'transfer-approval',
        name: 'transferApproval',
        meta: {
          title: '转账审批',
        },
        component: () => import('@/pages/money/transfer-approval.vue'),
      },
      {
        path: 'transfer-query',
        name: 'transferQuery',
        meta: {
          title: '转账记录查询',
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
        path: 'money-monitor',
        name: 'moneyMonitor',
        meta: {
          title: '资金监控',
        },
        component: () => import('@/pages/money/money-monitor.vue'),
      },
      {
        path: 'reconciliation',
        name: 'reconciliation',
        meta: {
          title: '总额对账',
        },
        component: () => import('@/pages/money/reconciliation.vue'),
      },
    ],
  },
  {
    path: '/third-application',
    name: 'third-application',
    redirect: '/third-application/created',
    meta: {
      title: '第三方应用管理',
    },
    component: Index,
    children: [
      {
        path: 'created',
        name: 'created',
        meta: {
          title: '应用管理',
        },
        component: () => import('@/pages/third-application/created.vue'),
      },
      {
        path: 'shelf-application',
        name: 'shelfApplication',
        meta: {
          title: '已上架应用',
        },
        component: () => import('@/pages/third-application/shelf-application.vue'),
      },{
        path: 'application-details',
        name: 'applicationDetails',
        meta: {
          title: '已上架应用详情',
        },
        component: () => import('@/pages/third-application/application-details.vue'),
      }],
  },
  {
    path: '/banner',
    name: 'banner',
    redirect: '/banner/banner',
    meta: {
      title: '轮播图管理',
    },
    component: Index,
    children: [
      {
        path: 'banner',
        meta: {
          title: '轮播图管理',
        },
        component: () => import('@/pages/banner/banner.vue'),
      },
    ],
  },
  {
    path: '/currency-increase',
    name: 'currencyIncrease',
    redirect: '/currency-increase/activity',
    meta: {
      title: '增币计划管理',
    },
    component: Index,
    children: [
      {
        path: 'activity',
        name: 'activity',
        meta: {
          title: '活动管理',
        },
        component: () => import('@/pages/currency-increase/activity.vue'),
      },
      {
        path: 'position-record',
        name: 'positionRecord',
        meta: {
          title: '持仓记录查询',
        },
        component: () => import('@/pages/currency-increase/position-record.vue'),
      },
      {
        path: 'out-record',
        name: 'outRecord',
        meta: {
          title: '出仓记录查询',
        },
        component: () => import('@/pages/currency-increase/out-record.vue'),
      }
    ],
  },
  {
    path: '/message',
    name: 'message',
    redirect: '/message/message',
    meta: {
      title: '消息推送管理',
    },
    component: Index,
    children: [
      {
        path: 'message',
        meta: {
          title: '消息推送管理',
        },
        component: () => import('@/pages/message/message.vue'),
      },
      {
        path: 'messageDetails',
        name: 'messageDetails',
        meta: {
          title: '消息推送详情',
        },
        component: () => import('@/pages/message/messageDetails.vue'),
      },
    ],
  },
  {
    path: '/feedback',
    name: 'feedback',
    redirect: '/feedback/feedback',
    meta: {
      title: '意见反馈管理',
    },
    component: Index,
    children: [
      {
        path: 'feedback',
        meta: {
          title: '意见反馈管理',
        },
        component: () => import('@/pages/feedback/feedback.vue'),
      },
      {
        path: 'feedbackDetails',
        name: 'feedbackDetails',
        meta: {
          title: '意见反馈详情',
        },
        component: () => import('@/pages/feedback/feedbackDetails.vue'),
      },
    ],
  },
  {
    path: '/configurable',
    name: 'configurable',
    redirect: '/configurable/currency',
    meta: {
      title: '可配数据管理',
    },
    component: Index,
    children: [
      {
        path: 'currency',
        name: 'currency',
        meta: {
          title: '币种设置',
        },
        component: () => import('@/pages/configurable/currency.vue'),
      },
      {
        path: 'currency-set',
        name: 'currencySet',
        meta: {
          title: '新增修改币种',
        },
        component: () => import('@/pages/configurable/currency-set.vue'),
      },
      {
        path: 'calculate',
        name: 'calculate',
        meta: {
          title: '算力规则',
        },
        component: () => import('@/pages/configurable/calculate.vue'),
      },
      {
        path: 'send-money',
        name: 'sendMoney',
        meta: {
          title: '送币规则',
        },
        component: () => import('@/pages/configurable/send-money.vue'),
      },
      {
        path: 'collect-alarm',
        name: 'collectAlarm',
        meta: {
          title: '收告警短信设置',
        },
        component: () => import('@/pages/configurable/collect-alarm.vue'),
      },
      {
        path: 'client',
        name: 'client',
        meta: {
          title: '客户端版本',
        },
        component: () => import('@/pages/configurable/client.vue'),
      }
    ],
  },
  {
    path: '/identity',
    name: 'identity',
    redirect: '/identity/identity',
    meta: {
      title: '身份审核',
    },
    component: Index,
    children: [
      {
        path: 'identity',
        meta: {
          title: '身份审核',
        },
        component: () => import('@/pages/identity/identity.vue'),
      },
      {
        path: 'identity-modify',
        name: 'identityModify',
        meta: {
          title: '身份信息修改',
        },
        component: () => import('@/pages/identity/identity-modify.vue'),
      },
      {
        path: 'identity-details',
        name: 'identityDetails',
        meta: {
          title: '身份审核详情',
        },
        component: () => import('@/pages/identity/identity-details.vue'),
      },
    ],
  },
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
