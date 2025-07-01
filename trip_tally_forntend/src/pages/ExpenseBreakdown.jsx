import React, { useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
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
import COLORS from "../constants/color";

import bgImg from "../assets/bg_second.jpg";
import { useDispatch, useSelector } from "react-redux";

import { toast, ToastContainer } from "react-toastify";
import { fetchExpensesByCategoryForTrip } from "../slices/analysisSlice";

function ExpenseBreakdown() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const { loading, error, data } = useSelector((state) => state.analysis);
  const pieData = data?.breakdown?.map((item) => ({
    name: item.category,
    value: item.totalSpent,
  }));

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    dispatch(fetchExpensesByCategoryForTrip({ token, id }));
  }, []);
  const renderCustomizedLabel = ({ percent }) =>
    `${(percent * 100).toFixed(0)}%`;

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
        }}
      >
        <Sidebar id={id} />
        <div className="w-full h-screen flex flex-col m-2 sm:m-0  sm:items-center justify-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">Expenses Breakdown</h3>
            <div className="lg:w-[600px] sm:w-[300px] md:w-[400px] w-[100%] h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={renderCustomizedLabel}
                  >
                    {pieData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-6 text-sm text-[#372723]">
              {pieData?.map((item, index) => (
                <li key={index} className="flex justify-between py-1">
                  <span className=" uppercase font-bold">{item.name}</span>
                  <span className="font-semibold italic">₹{item.value}</span>
                </li>
              ))}
            </ul>
            <span className="text-[#372723] text-[18px] sm:text-2xl font-serif">
              Total: <b>{data?.totalSpent}</b>
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ExpenseBreakdown;
