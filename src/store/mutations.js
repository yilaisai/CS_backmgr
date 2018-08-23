/**
 *  Created by   阿紫
 *  On  2018/7/4
 *  Content
 */

export const updateLoadingStatus = (state, payload) => {
  state.isLoading = payload.isLoading;
};

export const setCoinList = (state, payload) => {
  state.coinList = payload;
};


export const setQueryOrderType = (state, payload) => {
  state.teamTypeList = payload;
};
