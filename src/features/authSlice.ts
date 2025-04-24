import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthState, User } from "./authTypes";

// ✅ LOGIN THUNK
export const loginUser = createAsyncThunk<
  User,
  { username: string; password: string },
  { rejectValue: string }
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const res = await axios.post(
      "https://dummyjson.com/auth/login",
      credentials
    );
    // Tokenni user bilan birga qaytarish
    const userWithToken = {
      ...res.data,
      token: res.data.token, // Tokenni qo‘shamiz
    };
    return userWithToken;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Login failed"
    );
  }
});

// ✅ REGISTER THUNK (demo uchun)
export const registerUser = createAsyncThunk<
  User,
  {
    username: string;
    password: string;
    email: string;
    secondname: string;
    repassword: string;
  },
  { rejectValue: string }
>("auth/register", async (newUser, thunkAPI) => {
  try {
    return {
      id: Date.now(),
      username: newUser.username,
      email: `${newUser.username}@example.com`,
      token: "fake_token", // Buni API tokeniga almashtiring
    };
  } catch {
    return thunkAPI.rejectWithValue("Register failed");
  }
});

// 👉 Initial State
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload; // Tokenni saqlash
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login error";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload; // Tokenni saqlash
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Register error";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
