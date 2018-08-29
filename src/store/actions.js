
import { $http } from '@/common/http';

export const getSampleCoinInfo = ({ state, commit }) => {
  if (!state.coinList.length) {
    $http.post('wallet/backmgr/coin/getSampleCoinInfo.do')
      .then((res) => {
        const { list } = res.result;
        list.forEach((item) => {
          item.value = item.coinId;
          item.label = item.coinName;
        });
        commit('setCoinList', list);
        return list;
      });
  } else {
    return state.coinList;
  }
};

export const getQueryOrderType = ({ state, commit }) => {
  if (!state.teamTypeList.length) {
    $http.post('wallet/backmgr/trade/getQueryOrderType.do')
      .then((res) => {
        const { list } = res.result;
        commit('setQueryOrderType', list);
        return list;
      });
  } else {
    return state.coinList;
  }
};
