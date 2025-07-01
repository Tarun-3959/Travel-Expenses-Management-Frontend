import React, { useEffect } from "react";
import Navbaar from "../components/Navbaar";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../slices/tripSlice";
import TripCard from "../components/TripCard";
import bgImg from "../assets/bg_second.jpg";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading-animation4.json";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

function Dashboard() {
  const { trips, error, loading } = useSelector((state) => state.trips);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData(token));
  }, []);

  if (error) toast.error(error);
  if (loading)
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
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "10px",
        }}
        className="w-full min-h-screen"
      >
        {trips.length == 0 ? (
          <div className="w-full h-screen flex flex-col items-center justify-center">
            <h2 className=" font-bold text-[25px] sm:text-[35px]">
              No Trip Avaiable
            </h2>
            <button
              onClick={() => {
                navigate("/create-trip");
              }}
              className=" border-gray-500 rounded px-3 py-1 mt-5 text-[#feffff] bg-[#5D8A81] font-bold cursor-pointer hover:bg-[#2e443f]"
            >
              Create Trip
            </button>
          </div>
        ) : (
          <div className="w-full min-h-screen flex flex-wrap justify-center  gap-2">
            {trips?.map((trip, index) => (
              <div key={index}>
                <TripCard trip={trip} />
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
