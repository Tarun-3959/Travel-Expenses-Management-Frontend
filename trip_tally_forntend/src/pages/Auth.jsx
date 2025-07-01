import React, { use, useEffect, useState } from "react";
import Lottie from "lottie-react";
import { ToastContainer, toast } from "react-toastify";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../styles/Auth.css"; // same CSS as your original
import { signIn, signUp } from "../slices/authSlice";
import loadingAnimation from "../assets/loading-animation4.json";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const { user, error, token, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    dispatch(signIn({ email, password }));
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confimPassword = e.target[3].value;
    if (password !== confimPassword) {
      toast.error("Password do not match!");
    } else {
      dispatch(signUp({ name, email, password }));
    }
  };
  return (
    <div className="body">
      <ToastContainer position="top-center" />
      {loading ? (
        <div className="w-[250px] font-black">
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
      ) : (
        <div className={`wrapper ${isSignup ? "signup-mode" : ""}`}>
          <div className="title-text">
            <div className="title login">Login Form</div>
            <div className="title signup">Signup Form</div>
          </div>
          <div className="form-container">
            <div className="slide-controls">
              <input
                type="radio"
                name="slide"
                id="login"
                checked={!isSignup}
                onChange={() => setIsSignup(false)}
              />
              <input
                type="radio"
                name="slide"
                id="signup"
                checked={isSignup}
                onChange={() => setIsSignup(true)}
              />
              <label htmlFor="login" className="slide login">
                Login
              </label>
              <label htmlFor="signup" className="slide signup">
                Signup
              </label>
              <div className="slider-tab"></div>
            </div>
            <div className="form-inner">
              <form onSubmit={handleLogin} className="login">
                <div className="field">
                  <input type="email" placeholder="Email Address" required />
                </div>
                <div className="field">
                  <input
                    type="password"
                    minLength={3}
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="pass-link">
                  <Link to="/reset-password">Forgot password?</Link>
                </div>
                <div className="field btn">
                  <input type="submit" value="Login" />
                </div>
                <div className="signup-link">
                  Not a member?
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsSignup(true);
                    }}
                  >
                    Signup now
                  </a>
                </div>
              </form>
              <form onSubmit={handleSignUp} className="signup">
                <div className="field">
                  <input type="text" placeholder="Name" required />
                </div>
                <div className="field">
                  <input type="email" placeholder="Email Address" required />
                </div>
                <div className="field">
                  <input
                    type="password"
                    minLength={3}
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="field">
                  <input
                    type="password"
                    minLength={3}
                    placeholder="Confirm password"
                    required
                  />
                </div>
                <div className="field btn">
                  <input type="submit" value="Signup" />
                </div>
              </form>
            </div>
            <NavLink
              to="/"
              style={{
                color: "#1a75ff",
                cursor: "pointer",
              }}
              href="/"
            >
              Back to Home
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};
export default Auth;
