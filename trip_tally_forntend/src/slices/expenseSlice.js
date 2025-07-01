import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const fetchExpenses = createAsyncThunk(
  "/triptally/expenses/fetch",
  async ({ token, id }, { getState, rejectWithValue }) => {
    try {
      const expenses = getState().expenses.expenses;

      let expense = expenses[id];
      if (expense) {
        console.log("Expenses are comming from chache");
        return expense;
      }
      let obj = {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${token}`,
        },
      };
      console.log("Expenses are comming from server");
      let resp = await fetch(`${BASE_URL}/expenses/${id}`, obj);
      let data = await resp.json();

      if (data.errorMessage) throw new Error(data.errorMessage);
      let tripData = { id, data: data.expenses };
      return tripData;
    } catch (error) {
      console.log("error is occuring durning fetching expenses:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const setExpense = createAsyncThunk(
  "/triptally/trip/add-expense",
  async ({ token, id, expense }, { rejectWithValue }) => {
    try {
      let obj = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${token}`,
        },
        body: JSON.stringify(expense),
      };
      let resp = await fetch(`${BASE_URL}/expenses/${id}`, obj);
      let data = await resp.json();
      if (data.errorMessage) throw new Error(data.errorMessage);
      return { id, data: data.expense };
    } catch (error) {
      console.log("error is occuring durning creating data:", error);
      return rejectWithValue(error.message);
    }
  }
);
/*
export const updateData = createAsyncThunk(
  "/triptally/trip/update-trip",
  async ({ token, trip, id }, { rejectWithValue }) => {
    try {
      let obj = {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${token}`,
        },
        body: JSON.stringify(trip),
      };
      let resp = await fetch(`${BASE_URL}/trips/${id}`, obj);
      let data = await resp.json();
      if (data.errorMessage) throw new Error(data.errorMessage);
      return data.trip;
    } catch (error) {
      console.log("error is occuring durning updating data:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteData = createAsyncThunk(
  "/triptally/trip/delete-trip",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      let obj = {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${token}`,
        },
      };
      let resp = await fetch(`${BASE_URL}/trips/${id}`, obj);
      let data = await resp.json();
      if (data.errorMessage) throw new Error(data.errorMessage);
      return id;
    } catch (error) {
      console.log("error is occuring durning deleting data:", error);
      return rejectWithValue(error.message);
    }
  }
);
*/

const expenseSlice = createSlice({
  name: "expenses",
  initialState: { expenses: {}, error: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.expenses[action.payload.id] = action.payload.data;
        state.loading = false;
        state.error = null;
        return state;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(setExpense.pending, (state) => {
        state.loading = true;
      })
      .addCase(setExpense.fulfilled, (state, action) => {
        if (state.expenses[action.payload.id])
          state.expenses[action.payload.id].push(action.payload.data);
        state.loading = false;
        state.error = null;
      })
      .addCase(setExpense.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
    /*
      .addCase(updateData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateData.fulfilled, (state, action) => {
        state.trips = state.trips.map((trip) => {
          if (trip._id == action.payload._id) return action.payload;
          return trip;
        });
        state.loading = false;
        state.error = null;
      })
      .addCase(updateData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteData.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.trips = state.trips.filter((trip) => trip._id !== action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      */
  },
});

export default expenseSlice.reducer;
