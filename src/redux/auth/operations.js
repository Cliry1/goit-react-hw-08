import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// axios.defaults.baseURL = "https://pet-proj-vjtd.onrender.com";
axios.defaults.baseURL = "http://localhost:3000";

const setAuthHeader = (accessToken) => {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};



export const fetchWithRefresh = async (thunkAPI, callback) => {
  try {
    return await callback();
  } catch (error) {
    if (error.response?.status === 401 && error.response?.data?.data?.message === "Access token expired") {
      try {
        await thunkAPI.dispatch(refreshToken());
        const state = thunkAPI.getState();
        const newToken = state.auth.token;
        setAuthHeader(newToken);
        return await callback();
      } catch {
        thunkAPI.dispatch(logout());
        return thunkAPI.rejectWithValue("Session expired");
      }
    }
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
};


export const refreshToken = createAsyncThunk('auth/refreshToken',
  async(_, thunkAPI)=>{
    try {
      const response = await axios.post('/auth/refreshToken', {}, { withCredentials: true })
      setAuthHeader(response.data.data.accessToken);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)



export const register = createAsyncThunk('auth/register',
  async(credentials, thunkAPI)=>{
    try {
      const response = await axios.post('/auth/register', credentials )
      setAuthHeader(response.data.data.accessToken);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const login = createAsyncThunk("auth/login",
  async(credentials, thunkAPI)=>{
    try {
      const response = await axios.post("/auth/login", credentials, { withCredentials: true })
      setAuthHeader(response.data.data.accessToken);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const logout = createAsyncThunk("auth/logout",
  async(_, thunkAPI)=>{
    try {
      await axios.post("/auth/logout",{} ,{
  withCredentials: true 
})
      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const refreshUser = createAsyncThunk( 'auth/refresh',
   async (_, thunkAPI) => { 
    return fetchWithRefresh(thunkAPI, async () => { 
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;
      setAuthHeader(persistedToken);
      const response = await axios.get('/auth/refresh-user') 
      return response.data.data; 
    }); 
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      if (!state.auth.token) return false;
      if (state.auth.isRefreshing) return false;
      return true;
    }
  }
);




export const oauthLoginWithGoogle = createAsyncThunk("auth/loginWithGoogle",
  async(code, thunkAPI)=>{
    try {
      const response = await axios.post("/auth/confirm-oauth",{code});
      setAuthHeader(response.data.data.accessToken);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

