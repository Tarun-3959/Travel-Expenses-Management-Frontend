import React from "react";
import { useSelector } from "react-redux";
import { Navigate, replace } from "react-router-dom";

import loadingAnimation from "../assets/loading-animation4.json";
import Lottie from "lottie-react";

function ProtectedRoute({ children }) {
  const { user, loading, initialized } = useSelector((state) => state.auth);
  if (!initialized || loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-[250px] font-black">
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
      </div>
    );
  return user ? children : <Navigate to="/auth" />;
}

export default ProtectedRoute;
