
export const updateLoadingStatus = (state, payload) => {
  state.isLoading = payload.isLoading;
};

export const setCoinList = (state, payload) => {
  state.coinList = payload;
};


export const setQueryOrderType = (state, payload) => {
  state.teamTypeList = payload;
};

export const setCoinInfo = (state, payload) => {
	state.coinInfo = payload
}