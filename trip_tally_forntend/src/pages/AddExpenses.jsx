import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbaar from "../components/Navbaar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import loadingAnimation from "../assets/loading-animation4.json";
import Lottie from "lottie-react";

import bgImg from "../assets/bg_second.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../slices/tripSlice";
import { toast, ToastContainer } from "react-toastify";
import { setExpense } from "../slices/expenseSlice";

function AddExpenses() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const tripState = useSelector((state) => state.trips);
  const { error, loading } = useSelector((state) => state.expenses);
  //const cate = ["food", "cat", "dog", "elephant"];
  useEffect(() => {
    dispatch(fetchCategories({ token, id }));
    if (tripState.categoryError) toast.error(tripState.categoryError);
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let category = e.target[0].value;
    let amount = e.target[1].value;
    if (+amount <= 0) return toast.error("Invalid Amount!");
    let description = e.target[2].value || "";
    let date = e.target[3].value;
    let expense = { category, amount, description, date };
    dispatch(setExpense({ token, id, expense }));
    if (error) toast.error(error);
    else {
      navigate(`/trip/expenses/${id}`);
    }
  };

  if (tripState.loading || loading)
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
        <div className="w-full h-screen flex  sm:items-center justify-center">
          <form
            onSubmit={handleOnSubmit}
            className="bg-white p-3 rounded-2xl w-[95%] mt-[150px] sm:mt-0 h-fit sm:w-[50%] flex flex-col gap-7"
          >
            <div className="flex flex-col gap-3">
              <lable className="font-bold">Category*</lable>
              <select className="border border-gray-400 rounded px-2 py-1">
                {tripState.categories?.map((cat, index) => (
                  <option key={index} value={cat.toLowerCase()}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <lable className="font-bold">Amount*</lable>
              <input
                className="border border-gray-400 rounded px-2 py-1"
                type="number"
                placeholder="e.g 5000"
                minLength={0}
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <lable className="font-bold">Description</lable>
              <input
                className="border border-gray-400 rounded px-2 py-1"
                type="text"
                placeholder="e.g For Rent"
              />
            </div>
            <div className="flex flex-col gap-3">
              <lable className="font-bold">Date*</lable>
              <input
                className="border border-gray-400 rounded px-2 py-1"
                type="date"
                required
              />
            </div>
            <div className="flex justify-evenly my-2.5">
              <button
                onClick={() => navigate(`/trip/add-category/${id}`)}
                className="rounded bg-[#604b46] hover:bg-[#372723] text-white px-3 py-2 font-semibold"
                type="button"
              >
                Add new Category
              </button>
              <button
                className="rounded bg-[#604b46] hover:bg-[#372723] text-white px-3 py-2 font-semibold"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddExpenses;
