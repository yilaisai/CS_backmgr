import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';
import store from './store';
import Http from './common/http';
import components from './common/components';
import filter from './common/filter';
import Viewer from 'v-viewer'
import utils from '@/assets/js/utils'
import 'viewerjs/dist/viewer.css';
import VueClipboard from 'vue-clipboard2'


Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(Http);
Vue.use(components);
Vue.use(Viewer);
Vue.use(utils);
Vue.use(VueClipboard)

Vue.prototype.$variableCoin = 'RMT'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
Vue.filter("optType", function (val) {  //保留小数位，acc为保留几位小数位
  switch(val*1) {
    case 0:
      return '创建订单'
    break;
    case 3:
      return '申诉买方赢，直接放币'
    break;
    case 4:
      return '申诉卖方赢，出售广告回滚卖家'
    break;
    case 11:
      return '成为商户'
    break;
    case 12:
      return '卖家取消订单'
    break;
    case 13:
      return '取消商家认证'
    break;
    case 14:
      return '钱包转账到法币'
    break;
    case 15:
      return '取消订单'
    break;
    case 16:
      return '完成交易'
    break;
    case 17:
      return '手续费'
    break;
    case 18:
      return '申诉买方赢，购买广告回滚卖家的币'
    break;
    case 19:
      return '解冻金额'
    break;
    case 20:
      return '钱包转账到法币'
    break;
    case 21:
      return '承兑商折扣'
    break;
    case 22:
      return '直接折扣'
    break;
    case 23:
      return '间接折扣'
    break;
    case 24:
      return '鼓励金'
    break;
    case 25:
      return 'otc发起充币'
    break;
    case 26:
      return 'otc发起提币'
    break;
    case 27:
      return 'otc提币失败'
	break;
	case 28:
      return '激活订单'
    break;
  case 29:
    return '申诉修改金额'
    break;
  case 30:
    return '资产证明转入'
    break;
  case 31:
    return '资产证明转出'
    break;
  case 32:
    return '系统费率'
    break;
  case 33:
    return '佣金'
    break;
  default:
    return val
}
});
