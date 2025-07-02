import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const fetchData = createAsyncThunk(
  "/triptally/trip/fetch",
  async (token, { getState, rejectWithValue }) => {
    try {
      const trips = getState().trips.trips;
      if (trips.length !== 0) {
        {
          console.log("trips are comming from chache");
          return trips;
        }
      } else {
        let obj = {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${token}`,
          },
        };
        console.log("trips are comming from server");
        let resp = await fetch(`${BASE_URL}/trips`, obj);
        let data = await resp.json();
        if (data.errorMessage) throw new Error(data.errorMessage);
        return data.trips;
      }
    } catch (error) {
      console.log("error is occuring durning fetching data:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const setData = createAsyncThunk(
  "/triptally/trip/set-trip",
  async ({ token, trip }, { rejectWithValue }) => {
    try {
      let obj = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${token}`,
        },
        body: JSON.stringify(trip),
      };
      let resp = await fetch(`${BASE_URL}/trips`, obj);
      let data = await resp.json();
      if (data.errorMessage) throw new Error(data.errorMessage);
      return trip;
    } catch (error) {
      console.log("error is occuring durning creating data:", error);
      return rejectWithValue(error.message);
    }
  }
);

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

export const fetchCategories = createAsyncThunk(
  "/triptally/category/fetch",
  async ({ token, id }, { getState, rejectWithValue }) => {
    try {
      const trips = getState().trips.trips;
      const trip = trips.find((trip) => trip._id == id);
      if (trip) {
        return trip.categories.map((cat) => cat.name);
      }
      let obj = {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${token}`,
        },
      };
      let resp = await fetch(`${BASE_URL}/trips/${id}`, obj);
      let data = await resp.json();

      if (data.errorMessage) throw new Error(data.errorMessage);
      return data.trip.categories.map((cat) => cat.name);
    } catch (error) {
      console.log("error is occuring durning fetching data:", error);
      return rejectWithValue(error.message);
    }
  }
);

const tripSlice = createSlice({
  name: "trips",
  initialState: {
    trips: [],
    error: null,
    loading: false,
    categories: [],
    categoryError: null,
  },
  reducers: {
    clearTrips: (state) => {
      (state.trips = []), (state.categories = []);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.trips = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(setData.pending, (state) => {
        state.loading = true;
      })
      .addCase(setData.fulfilled, (state, action) => {
        state.trips.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(setData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
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
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
        state.categoryError = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoryError = action.payload;
        state.loading = false;
      });
  },
});

export const { clearTrips } = tripSlice.actions;

export default tripSlice.reducer;
