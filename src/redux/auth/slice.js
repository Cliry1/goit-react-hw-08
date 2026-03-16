import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  logout,
  register,
  refreshUser,
  oauthLoginWithGoogle,
  refreshToken,
  oauthLoginWithGithub,
  sendResetPasswordEmail,
  resetPassword,
  setPassword,
  sendSetPasswordEmail,
  checkHealth,
} from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
      isPasswordSet:null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: true,
    serverStatus:"idle",
    refreshDone: null,
  },

  reducers: {
    setServerDown(state) {
      state.serverStatus = "down";
    },
    setServerOk(state) {
      state.serverStatus = "ok";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.isLoggedIn = true;
        state.token = action.payload.data.accessToken;
        state.isRefreshing = false;
      })
      .addCase(login.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(login.rejected, (state) => {
        state.isRefreshing = false;
      })



      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.token = null;
        state.isRefreshing = false;
        state.user.name = null;
        state.user.email = null;
        state.user.isPasswordSet = null;
        state.refreshDone = null;

      })
      .addCase(logout.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(logout.rejected, (state) => {
        state.isRefreshing = false;
      })


      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.isLoggedIn = true;
        state.token = action.payload.data.accessToken;
        state.isRefreshing = false;
      })
      .addCase(register.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(register.rejected, (state) => {
        state.isRefreshing = false;
      })



      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.refreshDone = "pending";
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.refreshDone = "done";
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.token = null;
        state.refreshDone = "done";
      })



      .addCase(refreshToken.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.token = action.payload.accessToken;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isRefreshing = false;
      })



      .addCase(oauthLoginWithGoogle.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(oauthLoginWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.isLoggedIn = true;
        state.token = action.payload.data.accessToken;
        state.isRefreshing = false;
      })
      .addCase(oauthLoginWithGoogle.rejected, (state) => {
        state.isRefreshing = false;
      })



      .addCase(oauthLoginWithGithub.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(oauthLoginWithGithub.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.isLoggedIn = true;
        state.token = action.payload.data.accessToken;
        state.isRefreshing = false;
      })
      .addCase(oauthLoginWithGithub.rejected, (state) => {
        state.isRefreshing = false;
      })



      .addCase(sendResetPasswordEmail.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(sendResetPasswordEmail.fulfilled, (state) => {
        state.isRefreshing = false;
      })
      .addCase(sendResetPasswordEmail.rejected, (state) => {
        state.isRefreshing = false;
      })



      .addCase(resetPassword.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isRefreshing = false;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isRefreshing = false;
      })




      .addCase(sendSetPasswordEmail.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(sendSetPasswordEmail.fulfilled, (state) => {
        state.isRefreshing = false;
      })
      .addCase(sendSetPasswordEmail.rejected, (state) => {
        state.isRefreshing = false;
      })



      .addCase(setPassword.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(setPassword.fulfilled, (state) => {
        state.isRefreshing = false;
        state.user.isPasswordSet=true;
        state.token = null;
      })
      .addCase(setPassword.rejected, (state) => {
        state.isRefreshing = false;
      })



      .addCase(checkHealth.pending, (state, action) => {
        if(action.meta.arg?.silent) return;
        state.isRefreshing = true;
        state.serverStatus = "checking";
      })
      .addCase(checkHealth.fulfilled, (state, action) => {
        state.isRefreshing = false;
        if(!action.payload.data.dbActive) {
          state.serverStatus = "down";
          return;
        }
        state.refreshDone = "idle";
        state.serverStatus = "ok";
      })
      .addCase(checkHealth.rejected, (state) => {
        state.isRefreshing = false;
        state.serverStatus = "down";
      })
      

  },
});

export const authReducer = authSlice.reducer;
export const { setServerDown, setServerOk } = authSlice.actions;