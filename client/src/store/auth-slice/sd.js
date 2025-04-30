import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = { isAuthenticated: false, isLoading: false, user: null };
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:8080/api/auth/register",
      formData
    );
    return response.data;
  }
);
export const checkAuth = createAsyncThunk("/check-auth", async () => {
  const response = await axios.get(
    "http://localhost:8080/api/auth/check-auth",
    {
      withCredentials: true,
      headers: {
        "cache-control": "no-cache,no-store,must-revalidate,proxy-revalidate",
      },
    }
  );
  return response.data;
});
export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post(
    "http://localhost:8080/api/auth/login",
    formData
  );
  return response.data;
});
const authSllice = createSlice({
  name: "auth",
  initialState,
  reducers: { setUser: (state, action) => {} },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});
export const { setUser } = authSllice.actions;
export default authSllice.reducer;
