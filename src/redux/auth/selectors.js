export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectUser = state=> state.auth.user;
export const selectToken = state=> state.auth.token;
export const selectServerStatus = state=> state.auth.serverStatus;
export const selectIsPasswordSet = state => state.auth.user.isPasswordSet;
export const selectIsRefreshDone = state => state.auth.user.refreshDone;