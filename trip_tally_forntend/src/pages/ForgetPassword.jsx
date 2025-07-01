import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import loadingAnimation from "../assets/loading-animation4.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import bgImg from "../assets/bg_second.jpg";

const BASE_URL = import.meta.env.VITE_BASE_URL;
function ForgetPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState(null);
  const handleOnSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let obj = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: e.target[0].value }),
      };
      let resp = await fetch(`${BASE_URL}/auth/forget-password`, obj);
      let response = await resp.json();
      if (response.message) {
        setEmail(e.target[0].value);
        toast.success(response.message);
        setMessage(response.message);
        setError(null);
      } else {
        toast.error(response.errorMessage);
        setError(response.errorMessage);
      }
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let obj = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          code: e.target[0].value,
          password: e.target[1].value,
        }),
      };
      let resp = await fetch(`${BASE_URL}/auth/reset-password`, obj);
      let response = await resp.json();
      if (response.message) {
        toast.success(response.message);
        setTimeout(() => {
          navigate("/auth");
        }, 1000);
      } else {
        toast.error(response.errorMessage);
        setError(response.errorMessage);
      }
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <>
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
      </>
    );

  return (
    <>
      <ToastContainer position="top-center" />
      <div
        style={{
          backgroundImage: `url(${bgImg})`,
          padding: "10px",
        }}
        className="w-full h-screen flex items-center justify-center"
      >
        {!message ? (
          <form
            className="shadow-xl/30 rounded-2xl p-6 bg-white flex flex-col sm:w-[450px]"
            onSubmit={handleOnSubmit}
          >
            <label className="text-[1.5rem] font-semibold text-[#61482f]">
              Email*
            </label>
            <input
              className="rounded px-2 py-1 border border-gray-400"
              type="email"
              placeholder="Inter Registered email..."
              required
            />
            <div className="flex justify-evenly mt-3">
              <button
                className="bg-[#503e30] hover:bg-[#251e18] cursor-pointer text-white font-semibold px-1.5 py-0.5 rounded 
                          sm:text-2xl sm:px-3 sm:py-1"
                type="button"
                onClick={() => navigate("/auth")}
              >
                Back
              </button>
              <button
                className="bg-[#503e30] hover:bg-[#251e18] cursor-pointer text-white font-semibold px-1.5 py-0.5 rounded 
                          sm:text-2xl sm:px-3 sm:py-1"
                type="submit"
              >
                Send Code
              </button>
            </div>
          </form>
        ) : (
          <form
            className="shadow-xl/30 rounded-2xl p-6 bg-white flex flex-col gap-3"
            onSubmit={handleResetPassword}
          >
            <label className="text-[1.5rem] font-semibold text-[#61482f]">
              Enter Code*
            </label>
            <input
              className="rounded px-2 py-1 border border-gray-400"
              type="number"
              placeholder="6 digit code..."
              required
            />
            <label className="text-[1.5rem] font-semibold text-[#61482f]">
              New Password*
            </label>
            <input
              className="rounded px-2 py-1 border border-gray-400"
              type="text"
              placeholder="inter new password"
              required
            />
            <button
              className="bg-[#503e30] hover:bg-[#251e18] cursor-pointer text-white font-semibold px-1.5 py-0.5 rounded 
                          sm:text-2xl sm:px-3 sm:py-1 mt-2.5"
              type="submit"
            >
              RESET
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default ForgetPassword;
