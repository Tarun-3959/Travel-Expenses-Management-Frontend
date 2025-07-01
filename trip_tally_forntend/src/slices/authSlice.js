import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const signIn = createAsyncThunk(
  "trip-tally/user/sign-in",
  async ({ email, password }, { rejectWithValue }) => {
    console.log("emial and password:", email, password);
    try {
      const obj = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      };
      const resp = await fetch(`${BASE_URL}/auth/signin`, obj);
      const userDetails = await resp.json();
      if (userDetails.errorMessage) throw new Error(userDetails.errorMessage);
      localStorage.setItem("token", userDetails.token);
      localStorage.setItem("user", JSON.stringify(userDetails.user));
      return userDetails;
    } catch (error) {
      console.log("error occured during login:", error.message);
      return rejectWithValue(
        error.message || "Something Went Wrong During login"
      );
    }
  }
);

export const signUp = createAsyncThunk(
  "trip-tally/user/sign-up",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const obj = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      };
      const resp = await fetch(`${BASE_URL}/auth/signup`, obj);
      const userDetails = await resp.json();
      if (userDetails.errorMessage) throw new Error(userDetails.errorMessage);
      console.log("userDetail in signup:", userDetails);
      localStorage.setItem("token", userDetails.token);
      localStorage.setItem("user", JSON.stringify(userDetails.user));
      return userDetails;
    } catch (error) {
      return rejectWithValue(
        error.message || "Something Went Wrong During signup"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    token: null,
    initialized: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.token = null;
      state.error = null;
      state.initialized = true;
      localStorage.clear();
    },
    setUserFromLocalStorage: (state) => {
      let user = localStorage.getItem("user");
      let token = localStorage.getItem("token");
      if (user && token) {
        // user = JSON.parse(user);
        state.user = user;
        state.token = token;
        state.loading = false;
        state.error = null;
      }
      state.initialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        state.loading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logout, setUserFromLocalStorage } = authSlice.actions;
export default authSlice.reducer;
