import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setServerDown } from "./slice";

axios.defaults.baseURL = "https://pet-proj-vjtd.onrender.com";
// axios.defaults.baseURL = "http://localhost:3000";

const setAuthHeader = (accessToken) => {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const fetchWithRefresh = async (thunkAPI, callback) => {
  try {
    return await callback();
  } catch (error) {
    if (
      error?.response?.status === 401 &&
      error?.response?.data?.data?.message === "Access token expired"
    ) {
      try {
        await thunkAPI.dispatch(refreshToken()).unwrap();
        const newToken = thunkAPI.getState().auth.token;
        setAuthHeader(newToken);
        return await callback();
      } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
    if (error?.response?.data?.data?.message === "Session not found") {
      thunkAPI.dispatch(logout());
    }
    if (error?.response?.status >= 500 || error?.code === "ERR_NETWORK") {
      thunkAPI.dispatch(setServerDown());
    }
    return thunkAPI.rejectWithValue(error?.response?.data?.data || error);
  }
};

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(
        "/auth/refreshToken",
        {},
        { withCredentials: true },
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/auth/register", credentials, {
        withCredentials: true,
      });
      setAuthHeader(response.data.data.accessToken);
      return response.data;
    } catch (error) {
      if (error?.response?.status >= 500 || error?.code === "ERR_NETWORK") {
        thunkAPI.dispatch(setServerDown());
      }
      return thunkAPI.rejectWithValue(error?.response?.data?.data);
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/auth/login", credentials, {
        withCredentials: true,
      });
      setAuthHeader(response.data.data.accessToken);
      return response.data;
    } catch (error) {
      if (error?.response?.status >= 500 || error?.code === "ERR_NETWORK") {
        thunkAPI.dispatch(setServerDown());
      }
      return thunkAPI.rejectWithValue(error?.response?.data?.data);
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout", {}, { withCredentials: true });
    clearAuthHeader();
  } catch (error) {
    if (error?.response?.status >= 500 || error?.code === "ERR_NETWORK") {
      thunkAPI.dispatch(setServerDown());
    }
    return thunkAPI.rejectWithValue(error?.response?.data?.data);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    return fetchWithRefresh(thunkAPI, async () => {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;
      setAuthHeader(persistedToken);
      const response = await axios.get(
        "/auth/refresh-user",
        {},
        { withCredentials: true },
      );
      return response.data.data;
    });
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      if (!state.auth.token) return false;
      if (state.auth.isRefreshing) return false;
      if(state.auth.refreshDone==="done") return false;
      return true;
    },
  },
);

export const oauthLoginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (code, thunkAPI) => {
    try {
      const response = await axios.post(
        "/auth/confirm-oauth-google",
        { code },
        { withCredentials: true },
      );
      setAuthHeader(response.data.data.accessToken);
      return response.data;
    } catch (error) {
      if (error?.response?.status >= 500 || error?.code === "ERR_NETWORK") {
        thunkAPI.dispatch(setServerDown());
      }
      return thunkAPI.rejectWithValue(error?.response?.data?.data);
    }
  },
);

export const oauthLoginWithGithub = createAsyncThunk(
  "auth/loginWithGithub",
  async (code, thunkAPI) => {
    try {
      const response = await axios.post(
        "/auth/confirm-oauth-github",
        { code },
        { withCredentials: true },
      );
      setAuthHeader(response.data.data.accessToken);
      return response.data;
    } catch (error) {
      if (error?.response?.status >= 500 || error?.code === "ERR_NETWORK") {
        thunkAPI.dispatch(setServerDown());
      }
      return thunkAPI.rejectWithValue(error?.response?.data?.data);
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        "/auth/reset-pwd",
        { token, password },
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      if (error?.response?.status >= 500 || error?.code === "ERR_NETWORK") {
        thunkAPI.dispatch(setServerDown());
      }
      return thunkAPI.rejectWithValue(error?.response?.data?.data);
    }
  },
);

export const sendResetPasswordEmail = createAsyncThunk(
  "auth/sendResetPasswordEmail",
  async (email, thunkAPI) => {
    try {
      const { data } = await axios.post("/auth/send-reset-email", { email });
      return data;
    } catch (error) {
      if (error?.response?.status >= 500 || error?.code === "ERR_NETWORK") {
        thunkAPI.dispatch(setServerDown());
      }
      return thunkAPI.rejectWithValue(error?.response?.data?.data);
    }
  },
);


export const sendSetPasswordEmail = createAsyncThunk(
  "auth/sendSetPasswordEmail",
  async (email, thunkAPI) => {
    return fetchWithRefresh(thunkAPI, async () => {
      const { data } = await axios.post("/auth/send-set-pwd-email", { email });
      return data;
    });
  }
);

export const setPassword = createAsyncThunk(
  "auth/setPassword",
  async ({ token, password }, thunkAPI) => {
    return fetchWithRefresh(thunkAPI, async () => {
      const response = await axios.post(
        "/auth/set-password",
        { token, password },
        { withCredentials: true },
      );
      await thunkAPI.dispatch(logout());
      return response.data;
    });
  }
);

export const checkHealth = createAsyncThunk(
  "auth/checkHealth",
  async ({ silent } = {}, thunkAPI) => { 
    try {
      const response = await axios.get("/auth/health");
      return response.data;
    } catch (error) {
      if (error?.response?.status >= 500 || error?.code === "ERR_NETWORK") {
        thunkAPI.dispatch(setServerDown());
      }
      return thunkAPI.rejectWithValue(error?.response?.data?.data);
    }
  },
);
