import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register, refreshUser } from "./operations";

const authSlice = createSlice({
  name:"auth",
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },

  extraReducers:(builder)=>{
    builder
    .addCase(login.fulfilled, (state, action) =>{
      state.user = action.payload.user;
      state.isLoggedIn= true;
      state.token = action.payload.accessToken;
    })
    .addCase(logout.fulfilled, (state)=>{
      state.isLoggedIn= false;
      state.token = null;
    })
    .addCase(register.fulfilled, (state, action)=>{
      state.user = action.payload.user;
      state.isLoggedIn= true;
      state.token = action.payload.accessToken;
    })
    .addCase(refreshUser.pending, state=>{
      state.isRefreshing=true;
    })
    .addCase(refreshUser.fulfilled, (state, action)=>{
      state.user = action.payload;
      state.isLoggedIn= true;
      state.isRefreshing=false;
    })
    .addCase(refreshUser.rejected, state=>{
      state.isRefreshing=false;
    })
  }
})

export const authReducer = authSlice.reducer;
