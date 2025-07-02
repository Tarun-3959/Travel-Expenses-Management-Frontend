import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useNavigate, useParams } from "react-router-dom";
import Navbaar from "../components/Navbaar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import loadingAnimation from "../assets/loading-animation4.json";
import Lottie from "lottie-react";

import bgImg from "../assets/bg_second.jpg";
import { useDispatch, useSelector } from "react-redux";

import { toast, ToastContainer } from "react-toastify";
import { fetchExpensesVsBudget } from "../slices/analysisSlice";

function BudgetVsExpenses() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { loading, error, datatwo } = useSelector((state) => state.analysis);
  const [overAll, setOverall] = useState({});

  useEffect(() => {
    dispatch(fetchExpensesVsBudget({ token, id }));
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    const temp = datatwo?.reduce(
      (acc, curr) => {
        acc.overallBudget = acc.overallBudget + curr.budget;
        acc.overallSpent = acc.overallSpent + curr.spent;
        return acc;
      },
      { overallBudget: 0, overallSpent: 0 }
    );
    setOverall(temp);
  }, [datatwo]);

  if (loading)
    return (
      <>
        <Navbaar />
        <div
          style={{
            width: "100%",
            minHeight: "100vh",
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
          }}
        >
          <Sidebar id={id} />
          <div className="w-full h-screen flex items-center justify-center">
            <div className="w-[250px] font-black">
              <Lottie animationData={loadingAnimation} loop={true} />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  return (
    <>
      <ToastContainer position="top-center" />
      <Navbaar />
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          overflowX: "hidden",
        }}
      >
        <Sidebar id={id} />
        <div className="w-full h-screen flex flex-col m-2 sm:m-0  sm:items-center justify-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">Budget vs Spent</h3>

            {/* ✅ Horizontal scroll wrapper */}
            <div className="w-full mr-0.5 overflow-x-auto">
              <div className="min-w-[600px] w-fit h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={datatwo}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="budget" fill="#8884d8" name="Budget" />
                    <Bar dataKey="spent" fill="#82ca9d" name="Spent" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 text-[#372723] font-bold flex gap-4 lg:gap-0  items-center sm:justify-evenly text-[12px] lg:text-[20px]">
                <span>OverAll Budget: {overAll?.overallBudget}</span>
                <span>OverAll Spent: {overAll?.overallSpent}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default BudgetVsExpenses;
