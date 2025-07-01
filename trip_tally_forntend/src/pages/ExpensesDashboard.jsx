import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { fetchExpenses } from "../slices/expenseSlice";
import { fetchCategories } from "../slices/tripSlice";

import Navbaar from "../components/Navbaar";
import Footer from "../components/Footer";
import bgImg from "../assets/bg_second.jpg";

import loadingAnimation from "../assets/loading-animation4.json";
import Lottie from "lottie-react";
import Sidebar from "../components/Sidebar";
import Pagination from "../components/Pagination";

const ExpenseCard = ({ expense }) => {
  const formattedDate = new Date(expense.date).toLocaleDateString();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg capitalize">{expense.category}</h3>
        <span className="text-green-600 font-bold">₹{expense.amount}</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{formattedDate}</p>
      {expense.description && (
        <p className="text-gray-700 mt-1 text-sm italic">
          {expense.description}
        </p>
      )}
    </div>
  );
};

const ExpensesDashboard = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { loading, expenses, error } = useSelector((state) => state.expenses);
  const tripState = useSelector((state) => state.trips);
  let page = +searchParams.get("page") || 1;
  const perPage = 6;
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filterCategory, setFilterCategory] = useState(
    searchParams.get("cat") || "all"
  );
  const [filterDate, setFilterDate] = useState(searchParams.get("date") || "");
  const [inputDate, setInputDate] = useState(filterDate);

  useEffect(() => {
    dispatch(fetchExpenses({ token, id }));
    if (error) toast.error(error);
  }, []);

  useEffect(() => {
    dispatch(fetchCategories({ token, id }));
    if (tripState.categoryError) toast.error(tripState.categoryError);
  }, []);

  useEffect(() => {
    let filter = expenses[id]?.filter((expense) => {
      let isCat =
        filterCategory === "all"
          ? true
          : filterCategory.toLowerCase() === expense.category.toLowerCase();
      let isDate =
        filterDate == ""
          ? true
          : new Date(expense.date).toLocaleDateString().includes(filterDate);
      return isCat && isDate;
    });
    setFilteredExpenses(filter);
  }, [expenses, filterCategory, filterDate]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilterDate(inputDate);
    }, 500); // 500ms delay

    return () => clearTimeout(handler);
  }, [inputDate]);

  let startIndex = (page - 1) * perPage;
  let endIndex = startIndex + perPage;
  const paginatedData = filteredExpenses?.slice(startIndex, endIndex);

  function handlePageChange(p) {
    setSearchParams((prev) => {
      let params = new URLSearchParams(prev);
      params.set("page", p);
      return params;
    });
  }

  if (tripState.loading || loading)
    return (
      <>
        <Navbaar />
        <div
          style={{
            backgroundImage: `url(${bgImg})`,
            padding: "10px",
          }}
          className="w-full h-screen flex items-center justify-center"
        >
          <div className="w-[250px] font-black">
            <Lottie animationData={loadingAnimation} loop={true} />
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
        }}
        className="flex min-h-screen"
      >
        <Sidebar id={id} />
        <main className="w-3/3 p-6 overflow-y-auto">
          <div
            className="text-[0.7rem] w-full flex flex-col items-start justify-center p-1 sm:flex-row sm:justify-evenly sm:items-center sm:h-[100px] sm:text-[16px] bg-amber-400 mb-2"
            id="filter-pannel"
          >
            <div>
              <label className="font-semibold text-[#372723]">
                Search By Date:{" "}
              </label>
              <input
                className=" bg-white p-0.5 rounded ml-1"
                type="text"
                placeholder="e.g. 1 or 1/7 or 1/7/2000"
                value={inputDate}
                onChange={(e) => {
                  setInputDate(e.target.value);
                  setSearchParams((prev) => {
                    let params = new URLSearchParams(prev);
                    if (e.target.value == "") params.delete("date");
                    else params.set("date", e.target.value);
                    return params;
                  });
                }}
              ></input>
            </div>
            <div className="mt-2">
              <label className="font-semibold text-[#372723]">
                Select Category:{" "}
              </label>
              <select
                value={filterCategory}
                className=" bg-white p-0.5 rounded ml-1"
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  setSearchParams((prev) => {
                    let params = new URLSearchParams(prev);
                    if (e.target.value == "all") params.delete("cat");
                    else params.set("cat", e.target.value);
                    return params;
                  });
                }}
              >
                <option value="all">ALL</option>
                {tripState.categories?.map((cat, index) => (
                  <option key={index} value={cat.toLowerCase()}>
                    {cat.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">All Expenses</h2>
          {paginatedData?.length > 0 ? (
            paginatedData.map((expense) => (
              <ExpenseCard key={expense._id} expense={expense} />
            ))
          ) : (
            <p>No expenses found.</p>
          )}
          <Pagination
            currentPage={page}
            totalPage={Math.ceil(filteredExpenses?.length / perPage)}
            onPageChange={handlePageChange}
          />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ExpensesDashboard;
