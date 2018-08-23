/**
 *  Created by   阿紫
 *  On  2018/5/8
 *  Content
 */

import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import * as mutations from './mutations';


Vue.use(Vuex);

// Open strict mode. https://vuex.vuejs.org/zh-cn/strict.html
const strict = `"${process.env.NODE_ENV}"` === 'development';

const store = new Vuex.Store({
  state: {
    isLoading: false, // loading
    currentPageTitle: '',
    coinList: [], // 币 种
    teamTypeList: [], // 商户类型
  },
  getters,
  actions,
  mutations,
  strict,
});

export default store;
