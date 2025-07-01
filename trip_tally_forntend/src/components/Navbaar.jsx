import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
NavLink;
function Navbaar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div
      style={{
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#efd84c",
      }}
      className=" sm:p-5 sm:h-20 p-2 box-border h-16 sticky top-0 w-full flex justify-between items-center"
    >
      <div>
        <h1>
          <a className="font-[Knewave] sm:text-4xl text-2xl text-[#5d8a81]">
            Trip Tally
          </a>
        </h1>
      </div>
      <nav>
        <ul className=" list-none flex gap-2 sm:gap-5 items-center-safe ">
          <li>
            <button
              onClick={() => {
                navigate("/dashboard");
              }}
              className="sm:px-4 sm:py-2 sm:text-[1rem] rounded-2xl px-2 py-1 text-[13px] border-2 border-solid border-[#5d8a81]  text-white font-bold hover:bg-[#5d8a81] "
            >
              My Trips
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                navigate("/create-trip");
              }}
              className="sm:px-4 sm:py-2 sm:text-[1rem] rounded-2xl px-2 py-1 text-[13px] border-2 border-solid border-[#5d8a81]  text-white font-bold hover:bg-[#5d8a81] "
            >
              Create Trip
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                dispatch(logout());
              }}
              className="sm:px-4 sm:py-2 sm:text-[1rem] rounded-2xl px-2 py-1 text-[13px] border-2 border-solid border-[#5d8a81]  text-white font-bold hover:bg-[#5d8a81] "
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbaar;
