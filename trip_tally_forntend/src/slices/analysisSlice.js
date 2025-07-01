import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const fetchExpensesByCategoryForTrip = createAsyncThunk(
  "/trip/analysis-expensis/by-categories",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      let obj = {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${token}`,
        },
      };
      let resp = await fetch(
        `${BASE_URL}/analysis/category-breakdown/${id}`,
        obj
      );
      let res = await resp.json();
      if (res.errorMessage) throw new Error(res.errorMessage);
      let data = { totalSpent: res.totalSpent, breakdown: res.breakdown };
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchExpensesVsBudget = createAsyncThunk(
  "/trip/analysis-expensis/Expenses-vs-Budget",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      let obj = {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${token}`,
        },
      };
      let resp = await fetch(`${BASE_URL}/analysis/budget-vs-spent/${id}`, obj);
      let res = await resp.json();
      if (res.errorMessage) throw new Error(res.errorMessage);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const analysisSlice = createSlice({
  name: "analysis",
  initialState: { loading: false, error: null, data: null, datatwo: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpensesByCategoryForTrip.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpensesByCategoryForTrip.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchExpensesByCategoryForTrip.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchExpensesVsBudget.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpensesVsBudget.fulfilled, (state, action) => {
        state.datatwo = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchExpensesVsBudget.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default analysisSlice.reducer;
