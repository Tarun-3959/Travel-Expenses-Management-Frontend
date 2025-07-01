import { memo } from "react";
import { NavLink, useParams } from "react-router-dom";

const Sidebar = ({ id }) => {
  return (
    <div className="w-1/3 sm:w-1/4 min-h-screen bg-[#372723] p-2 shadow-lg">
      <h2 className="text-white sm:text-2xl font-bold mb-6">MENU</h2>
      <nav className=" flex flex-col gap-5">
        <NavLink
          to={`/trip/expenses/${id}`}
          style={({ isActive }) =>
            isActive ? { color: "#EFD84C", borderColor: "#EFD84C" } : {}
          }
          className=" text-[12px] sm:text-[20px] font-semibold text-white hover:cursor-pointer border-b-1 border-white"
        >
          All Expenses
        </NavLink>
        <NavLink
          to={`/trip/add-expense/${id}`}
          style={({ isActive }) =>
            isActive ? { color: "#EFD84C", borderColor: "#EFD84C" } : {}
          }
          className=" text-[12px] sm:text-[20px] font-semibold text-white hover:cursor-pointer border-b-1 border-white"
        >
          Add Expense
        </NavLink>
        <NavLink
          style={({ isActive }) =>
            isActive ? { color: "#EFD84C", borderColor: "#EFD84C" } : {}
          }
          to={`/trip/add-category/${id}`}
          className=" text-[12px] sm:text-[20px] font-semibold text-white hover:cursor-pointer  border-b-1 border-white"
        >
          Add Category
        </NavLink>
        <div className=" text-white font-semibold">
          <div className=" text-[12px] sm:text-[20px] hover:cursor-pointer border-b-1 border-white">
            Analysis
          </div>
          <div className="flex flex-col">
            <NavLink
              to={`/trip/expenses/analysis/breakdown/${id}`}
              style={({ isActive }) =>
                isActive ? { color: "#EFD84C", borderColor: "#EFD84C" } : {}
              }
              className=" w-[100%] sm:ml-5 ml-1 mt-1.5 sm:text-[11px] lg:text-[16px] text-[8px] hover:border-b-1 hover:border-white sm:w-fit"
            >
              ● Expense Breakdown
            </NavLink>
            <NavLink
              to={`/trip/expenses/analysis/budgetVsExpnes/${id}`}
              style={({ isActive }) =>
                isActive ? { color: "#EFD84C", borderColor: "#EFD84C" } : {}
              }
              className=" w-[100%] sm:ml-5 ml-1 mt-1.5 sm:text-[11px] lg:text-[16px] text-[8px] hover:border-b-1 hover:border-white sm:w-fit"
            >
              ● Budget Vs Expenses
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default memo(Sidebar);

/*

        <NavLink
          style={({ isActive }) =>
            isActive ? { color: "#EFD84C", borderColor: "#EFD84C" } : {}
          }
          to={`/trip/analysis/${id}`}
          className="text-[13px] sm:text-[20px] font-semibold text-white hover:cursor-pointer border-b-1 border-white"
        >
          Analysis
        </NavLink>

        */
