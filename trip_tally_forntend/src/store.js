import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import tripReducer from "./slices/tripSlice";
import expensesReducer from "./slices/expenseSlice";
import analysisReducer from "./slices/analysisSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    trips: tripReducer,
    expenses: expensesReducer,
    analysis: analysisReducer,
  },
});
