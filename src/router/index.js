import Vue from 'vue';
import Router from 'vue-router';
import globalRoutes from './router';
import store from '../store';

// import { Notification } from 'element-ui';

Vue.use(Router);

const router = new Router({
  routes: [
    ...globalRoutes,
  ],
});

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('wallet_token') && to.name !== 'Login') { // 判断是否已经登录且前往的页面不是登录页
    next({
      name: 'Login',
    });
  } else if (localStorage.getItem('wallet_token') && to.name === 'Login') { // 判断是否已经登录且前往的是登录页
    next({
      name: 'Index',
    });
  } else {
    next();
  }
});

export default router;
