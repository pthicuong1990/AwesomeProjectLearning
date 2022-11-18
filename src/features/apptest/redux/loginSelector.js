export const loginDataSelector = state => state.loginData;

export const userDataSelector = state => state.loginData.user;

export const isLoginSelector = state => state.loginData.isLogin;
export const isLoadingSelector = state => state.loginData.status === 'loading';
export const errorSelector = state => state.loginData.errorMessage;
