import { useState } from "react";
import Navbaar from "../components/Navbaar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { useParams, useNavigate } from "react-router-dom";

import bgImg from "../assets/bg_second.jpg";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import { updateData } from "../slices/tripSlice";

function AddCategory() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const { loading, error } = useSelector((state) => state.trips);
  const [categories, setCategories] = useState([
    {
      name: "",
      budget: "",
    },
  ]);
  const handleAddCategory = () => {
    setCategories((prev) => [...prev, { name: "", budget: "" }]);
  };

  const handleModifyCategory = (index, field, value) => {
    console.log("running");
    if (field == "budget" && +value < 0) return toast.error("Invalid budget");
    let temp = [...categories];
    temp[index][field] = value;
    setCategories(temp);
  };

  const handleRemoveCategory = (index) => {
    let temp = categories.filter((_, i) => i != index);
    setCategories(temp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trip = { newCategories: categories };
    dispatch(updateData({ token, trip, id }));
    if (error) toast.error(error);
    else {
      navigate(-1);
    }
  };
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
        <div className=" w-full h-screen flex sm:items-center sm:justify-center">
          <form
            style={{
              background: "rgba(255, 255, 255, 0.7)",
              padding: "10px",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
            className="max-w-[90%] h-fit mt-[150px] m-auto"
            onSubmit={handleSubmit}
          >
            {categories.map((category, index) => (
              <div
                className="flex items-center justify-evenly sm:w-[500px] w-[95%]"
                key={index}
              >
                <input
                  className=" w-[40%] p-2 border border-[#ccc] rounded-[8px] text-[0.6rem] sm:text-[1rem]"
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
                  className="w-[40%] p-2 border border-[#ccc] rounded-[8px] text-[0.6rem] sm:text-[1rem]"
                  required
                />
                {categories.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(index)}
                    className="w-[10%] text-red-600 font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddCategory}
              className="w-[40%] text-[8px] m-auto px-3 py-2 sm:text-[0.7rem] rounded-[8px] bg-[#5d8a81] hover:bg-[#2c4842] text-white cursor-pointer uppercase font-bold sm:tracking-[2px] "
            >
              + Add Another
            </button>

            <div className="flex justify-evenly">
              <button
                type="button"
                onClick={() => navigate(-1)}
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
      </div>
      <Footer />
    </>
  );
}

export default AddCategory;
