/**
 *  Created by   阿紫
 *  On  2018/8/8
 *  Content
 */
import axios from 'axios';
import { Notification } from 'element-ui';
import router from '@/router';
import store from '../store';
import qs from 'qs';

axios.defaults.baseURL = SERVER_PATH;

const httpInstance = axios.create({
  responseType: 'json',
  timeout: 10000,
  params: {},
  data: {},
  validateStatus(status) {
    return status >= 200 && status < 300;
  },
});

function responseErrorHandler(error) {
  store.commit('updateLoadingStatus', { isLoading: false });
  let text = '未知错误';
  const response = JSON.parse(JSON.stringify(error));
  if (response.status) {
    const { code, msg } = response.data;
    text = msg;
    if (code === 40008) {
      localStorage.removeItem('wallet_roleName');
      localStorage.removeItem('wallet_menuUrls');
      localStorage.removeItem('menuDefaultActive');
      localStorage.removeItem('wallet_token');
      localStorage.removeItem('wallet_username');
      router.push({ name: 'Login' });
    }
  } else {
    text = '系统错误';
  }

  Notification({
    type: 'error',
    title: '请求错误',
    message: text,
    duration: 5000,
  });
}

httpInstance.interceptors.request.use((config) => {
  const configs = config;
  //资产统计模块接口使用以下域名
  if(configs.url.indexOf('cloud/asset')>-1){
    if(configs.baseURL=='http://api.test.sacbox.net/'){
      //测试环境
      configs.baseURL='http://47.75.14.176:7002/'
    }else{
      //正式环境
      //configs.baseURL='http://13.231.172.222:7002/'
      configs.baseURL='https://apijp.sacbox.net/'
    }
    
  }
  if (localStorage.getItem('wallet_token')) {
    if (configs.method == "post") {
      configs.data.token = localStorage.getItem('wallet_token');
    } else {
      configs.params.token = localStorage.getItem('wallet_token');
    }
  }
  store.commit('updateLoadingStatus', { isLoading: true });
  const obj = {};
  Object.entries(config.data).forEach(([key, value]) => {
    if (value || value === '0' || value === 0 || value == 'empty') {
      obj[key] = value == 'empty' ? '' : value;
    }
  })
  config.data = obj;
  if (config.method === 'post') {
    configs.data = qs.stringify(config.data);
  }
  return configs;
}, error => Promise.reject(error));

httpInstance.interceptors.response.use((response) => {
  const { status, data } = response;
  const { code, msg } = data;
  store.commit('updateLoadingStatus', { isLoading: false });
  if (status === 200) {
    if (code == 200) {
      return data
    }
    responseErrorHandler(response);
  }
  return Promise.reject(response);
}, (error) => {
  responseErrorHandler(error);
  return Promise.reject(error);
});

export const $http = {
  get: (url, params = null, config = {}) => {
    const normalizedParams = params;
    return httpInstance.get(url, {
      params: normalizedParams,
      ...config,
    });
  },
  post: (url, data = null, config = {}) => httpInstance.post(url, data, config),
};

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', {
      value: $http,
      writable: false,
    });
  },
};
