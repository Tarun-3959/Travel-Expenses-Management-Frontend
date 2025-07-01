import React, { useState } from "react";

import bgImg from "../assets/bg_second.jpg";
import Navbaar from "../components/Navbaar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../slices/tripSlice";

import loadingAnimation from "../assets/loading-animation4.json";
import Lottie from "lottie-react";

import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCategory, setShowCategory] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const { loading, error } = useSelector((state) => state.trips);
  const [categories, setCategories] = useState([
    {
      name: "",
      budget: "",
    },
  ]);
  const [tripData, setTripData] = useState({});
  const handleAddCategory = () => {
    setCategories((prev) => [...prev, { name: "", budget: "" }]);
  };

  const handleModifyCategory = (index, field, value) => {
    let temp = [...categories];
    temp[index][field] = value;
    setCategories(temp);
  };

  const handleRemoveCategory = (index) => {
    let temp = categories.filter((_, i) => i != index);
    setCategories(temp);
  };

  const handleNext = (e) => {
    console.log(e.target[0].value);
    e.preventDefault();
    setTripData({
      tripName: e.target[0].value,
      destination: e.target[1].value,
      startDate: e.target[2].value,
      endDate: e.target[3].value,
    });
    setShowCategory(true);
    console.log("tripdata:", tripData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalBudget = categories.reduce(
      (acc, curr) => (acc += +curr.budget),
      0
    );
    let trip = { ...tripData, categories, totalBudget };
    dispatch(setData({ token, trip }));
    if (error) toast.error(error);
    else {
      toast.success("Trip Created!!");
      navigate("/dashboard");
    }
  };

  if (loading) {
    return (
      <>
        <Navbaar />
        <div
          style={{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full h-screen flex items-center justify-center">
            <div className="w-[250px] font-black">
              <Lottie animationData={loadingAnimation} loop={true} />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
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
          padding: "10px",
        }}
      >
        <div className=" text-center">
          <h2 className="font-[Knewave, system-ui] font-normal sm:text-5xl text-3xl text-[#5d8a81]">
            Create New Trip
          </h2>
          <p className="sm:text-[1.2rem] text-[0.7rem] w-max-[600px] text-[#483934] mt-3">
            Plan your next adventure smartly!
          </p>
        </div>
        {!showCategory ? (
          <form
            onSubmit={handleNext}
            style={{
              background: "rgba(255, 255, 255, 0.7)",
              padding: "30px",
              borderRadius: "12px",
              width: "400px",
              maxWidth: "90%",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              margin: "auto",
              marginTop: "25px",
            }}
          >
            <label className=" font-bold text-[1rem] mb-2 text-[#333]">
              Trip Name
            </label>
            <input
              className="p-2 border border-[#ccc] rounded-[8px] text-[0.8rem]"
              type="text"
              minLength={3}
              placeholder="e.g, Goa Vacation"
              required
            />
            <label className=" font-bold text-[1rem] mb-2 text-[#333]">
              Destination
            </label>
            <input
              className="p-2 border border-[#ccc] rounded-[8px] text-[0.8rem]"
              type="text"
              minLength={3}
              placeholder="e.g, Goa"
              required
            />
            <label className=" font-bold text-[1rem] mb-2 text-[#333]">
              Start Date
            </label>
            <input
              className="p-2 border border-[#ccc] rounded-[8px] text-[0.8rem]"
              type="date"
              required
            />
            <label className=" font-bold text-[1rem] mb-2 text-[#333]">
              End Date
            </label>
            <input
              className="p-2 border border-[#ccc] rounded-[8px] text-[0.8rem]"
              type="date"
              required
            />
            <button
              className="sm:px-6 sm:py-3 sm:text-[1rem] rounded-[8px] bg-[#5d8a81] hover:bg-[#2c4842] text-white cursor-pointer uppercase font-bold tracking-[2px] "
              type="submit"
            >
              Next
            </button>
          </form>
        ) : (
          <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Add Category Budgets
            </h2>
            <form
              style={{
                background: "rgba(255, 255, 255, 0.7)",
                padding: "10px",
                borderRadius: "12px",
                width: "600px",
                maxWidth: "100%",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                margin: "auto",
                marginTop: "25px",
              }}
              onSubmit={handleSubmit}
            >
              {categories.map((category, index) => (
                <div className="flex items-center justify-evenly" key={index}>
                  <input
                    className="p-2 border border-[#ccc] rounded-[8px] text-[0.6rem] sm:text-[1rem]"
                    type="text"
                    placeholder="Category Name"
                    value={category.name}
                    onChange={(e) =>
                      handleModifyCategory(index, "name", e.target.value)
                    }
                    required
                  />
                  <input
                    type="number"
                    placeholder="Budget"
                    value={category.budget}
                    onChange={(e) =>
                      handleModifyCategory(index, "budget", e.target.value)
                    }
                    className="p-2 border border-[#ccc] rounded-[8px] text-[0.6rem] sm:text-[1rem]"
                    required
                  />
                  {categories.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(index)}
                      className="text-red-600 font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddCategory}
                className="w-[30%] text-[8px] m-auto px-3 py-2 sm:text-[0.7rem] rounded-[8px] bg-[#5d8a81] hover:bg-[#2c4842] text-white cursor-pointer uppercase font-bold sm:tracking-[2px] "
              >
                + Add Another
              </button>

              <div className="flex justify-evenly">
                <button
                  onClick={() => setShowCategory(false)}
                  className=" text-[8px] px-3 py-2 sm:px-6 sm:py-3 sm:text-[1rem] rounded-[8px] bg-[#5d8a81] hover:bg-[#2c4842] text-white cursor-pointer uppercase font-bold sm:tracking-[2px] "
                >
                  Back
                </button>
                <button
                  type="submit"
                  className=" text-[8px] px-3 py-2 sm:px-6 sm:py-3 sm:text-[1rem] rounded-[8px] bg-[#5d8a81] hover:bg-[#2c4842] text-white cursor-pointer uppercase font-bold sm:tracking-[2px] "
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default CreateTrip;
