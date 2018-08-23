import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';
import store from './store';
import Http from './common/http';
import components from './common/components';
import filter from './common/filter';


Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(Http);
Vue.use(components);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
