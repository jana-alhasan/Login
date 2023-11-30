// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLogin } from '../api/authApi';

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
  try {
    const response = await fetchLogin(credentials);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else if (error.request) {
      throw new Error('No response received');
    } else {
      throw new Error('Error setting up the request');
    }
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  extraReducers: {
      [loginUser.pending]: (state) => {
        state.status = 'loading';
        state.error = null;
      },
      [loginUser.fulfilled]: (state, action) => {

        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
 
      },
      [loginUser.rejected ]: (state) => {
        state.status = 'failed';
        state.user = null;
        state.error = "Sorry! Wrong username or password, please try again";
      },
  },
});

export const selectUser = (state) => state.auth.user;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
