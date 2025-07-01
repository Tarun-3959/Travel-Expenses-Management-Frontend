import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import LandingPage from "./pages/LandingPage";
import { setUserFromLocalStorage } from "./slices/authSlice";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { Navigate } from "react-router-dom";
import CreateTrip from "./pages/CreateTrip";
import ExpensesDashboard from "./pages/ExpensesDashboard";
import AddExpenses from "./pages/AddExpenses";
import AddCategory from "./pages/AddCategory";
import Analysis from "./pages/Analysis";
import ExpenseBreakdown from "./pages/ExpenseBreakdown";
import BudgetVsExpenses from "./pages/BudgetVsExpenses";
import ForgetPassword from "./pages/ForgetPassword";
function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserFromLocalStorage());
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <LandingPage />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-trip"
          element={
            <ProtectedRoute>
              <CreateTrip />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route path="/reset-password" element={<ForgetPassword />} />
        <Route
          path="/trip/expenses/:id"
          element={
            <ProtectedRoute>
              <ExpensesDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trip/add-expense/:id"
          element={
            <ProtectedRoute>
              <AddExpenses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trip/add-category/:id"
          element={
            <ProtectedRoute>
              <AddCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trip/analysis/:id"
          element={
            <ProtectedRoute>
              <Analysis />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trip/expenses/analysis/breakdown/:id"
          element={
            <ProtectedRoute>
              <ExpenseBreakdown />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trip/expenses/analysis/budgetVsExpnes/:id"
          element={
            <ProtectedRoute>
              <BudgetVsExpenses />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
