import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const TOKEN_DATA_STORAGE = 'LOGIN_DATA';
const USER_DATA_STORAGE = 'USER_DATA_STORAGE';

export const BASE_URL = 'https://api.phdvasia.com';

export const headers = async () => {
  const token = await AsyncStorage.getItem(TOKEN_DATA_STORAGE);
  console.log('TOKEN: ', token);
  return {
    'Content-Type': 'application/json',
    lang: 'en',
    client: '236e3ed4-3038-441a-be5b-417871eb84d4',
    'x-token': `${token}`,
  };
};

export const getUser = createAsyncThunk('getUser', async () => {
  try {
    const value = await AsyncStorage.getItem(USER_DATA_STORAGE);
    return JSON.parse(value);
  } catch (e) {
    console.log('getUser', e);
  }
  return null;
});

export const getToken = createAsyncThunk('getToken', async () => {
  const value = await AsyncStorage.getItem(TOKEN_DATA_STORAGE);
  console.log('TOKEN: ', value);

  return value;
});

const clearData = async () => {
  await AsyncStorage.removeItem(TOKEN_DATA_STORAGE);
  await AsyncStorage.removeItem(USER_DATA_STORAGE);
};

const saveToken = async token => {
  await AsyncStorage.setItem(TOKEN_DATA_STORAGE, token);
};

const saveUserData = async user => {
  console.log('saveUserData', user);

  await AsyncStorage.setItem(USER_DATA_STORAGE, JSON.stringify(user));
};

export const logout = createAsyncThunk('api/logout', async () => {
  console.log('On logout');

  const header = await headers();
  const requestOptions = {
    method: 'PUT',
    headers: header,
  };
  console.log('Logout Header: ', requestOptions);

  const response = await fetch(
    `${BASE_URL}/v1/product-tenant/logout`,
    requestOptions,
  );

  const payload = await response.json();

  console.log('Logout Success: ', payload.data);
  if (payload.status) {
    await clearData();
    return true;
  }
  return false;
});

export const login = createAsyncThunk(
  'api/login',
  async (userName, password) => {
    const header = await headers();

    const requestOptions = {
      method: 'POST',
      headers: header,
      body: JSON.stringify({
        email: userName,
        password,
      }),
    };

    console.log('Login Request: ', requestOptions);

    const response = await fetch(
      `${BASE_URL}/v1/product-tenant/check-authentication`,
      requestOptions,
    );
    const payload = await response.json();
    console.log('Login Success: ', payload.data);
    return payload.data;
  },
);

export const verifyOtp = createAsyncThunk(
  'api/verifyOtp',
  async verifyOtpObject => {
    const header = await headers();

    const requestOptions = {
      method: 'POST',
      headers: header,
      data: {
        uuid: verifyOtpObject.uuid,
        otp: verifyOtpObject.otp,
      },
    };
    console.log('verify OPT Request: ', requestOptions);
    try {
      const response = await axios(
        'https://api.phdvasia.com/v1/product-tenant/login-otp',
        requestOptions,
      );
      const payload = response.data;

      console.log('Verify OTP Success: ', payload.data);
      await saveToken(payload.data.token);
      await saveUserData({
        name: payload.data.user.name,
        email: payload.data.user.email,
        uuid: payload.data.user.uuid,
      });

      return payload.data;
    } catch (e) {
      console.log('Error Data: ', e.response.data);
      console.log('Error Status: ', e.response.status);
      console.log('Verify OTP error: ', e);
      const data = await e.response.data;
      return data;
    }
  },
);

export const isUserLoggedIn = createAsyncThunk('getToken', async () => {
  const token = await AsyncStorage.getItem(TOKEN_DATA_STORAGE);
  return token;
});

const initState = {
  status: 'idle',
  errorMessage: null,
  loginData: {},
  user: {},
  isLogin: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState: initState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) state.loginData = action.payload;
      })
      .addCase(verifyOtp.pending, (state, action) => {
        state.status = 'loading';
        state.errorMessage = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log('verifyOtp.fulfilled', action);
        console.log('verifyOtp.fulfilled', action.payload);
        if (action.payload.error) {
          state.errorMessage = action.payload.error.message;
          return;
        }
        if (action.payload) {
          state.user = {
            name: action.payload.user.name,
            email: action.payload.user.email,
            uuid: action.payload.user.uuid,
          };
          state.token = action.payload.token;
          state.isLogin = !!action.payload.token;
        }
      })
      .addCase(isUserLoggedIn.fulfilled, (state, action) => {
        console.log('TOKEN: ', action.payload);
        state.status = 'idle';
        if (action.payload) {
          //state.token = action.payload;
          state.isLogin = !!action.payload;
        }
      })
      .addCase(getUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
        }
      })
      .addCase(logout.fulfilled, (state, action) => {
        console.log('Logout Success: ', action.payload);
        if (action.payload) {
          state.status = 'idle';
          state.loginData = {};
          state.user = {};
          state.isLogin = false;
        }
      });
  },
});

export default loginSlice;
