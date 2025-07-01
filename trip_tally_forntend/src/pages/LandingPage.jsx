import bgImg from "../assets/bg_second.jpg";
import Footer from "../components/Footer";
import { NavLink, useNavigate } from "react-router-dom";
function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <div
        id="main-container"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        <div
          id="header"
          style={{
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#efd84c",
          }}
          className=" sm:p-5 p-2 box-border h-20 sticky top-0 w-full flex justify-between items-center"
        >
          <div id="logo">
            <h1>
              <a className="font-[Knewave] sm:text-4xl text-2xl text-[#5d8a81]">
                Trip Tally
              </a>
            </h1>
          </div>
          <nav id="navlinks">
            <ul className=" list-none flex gap-2 sm:gap-5 ">
              <li>
                <a
                  className="sm:px-4 sm:py-2 sm:text-[1rem] rounded-2xl px-2 py-1 text-[13px] border-2 border-solid border-[#5d8a81]  text-white font-bold hover:bg-[#5d8a81] "
                  href="#"
                >
                  Homepage
                </a>
              </li>
              <li>
                <NavLink
                  to="/auth"
                  className="sm:px-4 sm:py-2 sm:text-[1rem] rounded-2xl px-2 py-1 text-[13px] border-2 border-solid border-[#5d8a81]  text-white font-bold hover:bg-[#5d8a81] "
                  href="/auth"
                >
                  Sign in
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/auth"
                  className="sm:px-4 sm:py-2 sm:text-[1rem] rounded-2xl px-2 py-1 text-[13px] border-2 border-solid border-[#5d8a81]  text-white font-bold hover:bg-[#5d8a81] "
                  href="/auth"
                >
                  Sing up
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div
          id="container"
          className=" flex flex-col items-center justify-center h-[94vh] text-white p-2.5 text-center"
        >
          <h1 className="font-[Knewave,system-ui] sm:font-normal text-[#5d8a81] text-[1.3rem] md:text-[2.5rem] lg:text-[3.5rem] ">
            Track Every Trip, Tally Every Rupee
          </h1>
          <p className="max-w-[300px] text-[#3D3934] text-[0.6rem] md:text-[1rem] md:max-w-[500px] lg:text-[1.2rem] lg:max-w-[600px]">
            Your ultimate companion for budgeting, tracking, and analyzing
            travel expenses — so you can enjoy every journey without the money
            stress.
          </p>

          <div className="flex gap-3.5 flex-wrap justify-center">
            <a href="#">
              <button
                onClick={() => navigate("/auth")}
                className="py-2 px-4 rounded-[10px] bg-[#5d8a81] text-white cursor-pointer font-bold mt-4"
              >
                Get Started
              </button>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;
