
import { $http } from '@/common/http';

export const getSampleCoinInfo = ({ state, commit }) => {
  if (!state.coinList.length) {
	// $http.post('wallet/backmgr/coin/getSampleCoinInfo')
	$http.post('/wallet/util/open/getCoinInfoList')
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
    $http.post('wallet/backmgr/trade/getQueryOrderType')
      .then((res) => {
        const { list } = res.result;
        commit('setQueryOrderType', list);
        return list;
      });
  } else {
    return state.coinList;
  }
};

export const getCoinInfo = ({state, commit}) => {
	$http.post('/wallet/util/open/getCoinInfoList').then(res => {
		commit('setCoinInfo', res.result.list)
	})
}
