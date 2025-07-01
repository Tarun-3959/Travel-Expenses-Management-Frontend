import React from "react";
import { useParams } from "react-router-dom";
import Navbaar from "../components/Navbaar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

import bgImg from "../assets/bg_second.jpg";

function Analysis() {
  const { id } = useParams();
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
        }}
      >
        <Sidebar id={id} />
        <main>
          <div></div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Analysis;
