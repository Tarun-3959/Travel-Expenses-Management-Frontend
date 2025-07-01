import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "../slices/tripSlice";
import { useNavigate } from "react-router-dom";
const TripCard = ({ trip }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  return (
    <>
      <div className="w-[20rem] sm:h-[25rem]  sm:w-[28rem] bg-white rounded-2xl shadow-lg shadow-[#eded23] p-6 space-y-4 hover:shadow-xl transition duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h2 className="text-xl font-bold text-gray-800">{trip.tripName}</h2>
          <span className="text-sm text-gray-500 mt-1 sm:mt-0">
            {new Date(trip.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="text-sm text-gray-600">
          <p>
            <span className="font-medium">Destination:</span> {trip.destination}
          </p>
          <p>
            <span className="font-medium">Dates:</span>{" "}
            {new Date(trip.startDate).toLocaleDateString()} -{" "}
            {new Date(trip.endDate).toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">Total Budget:</span> ₹
            {trip.totalBudget.toLocaleString()}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Budget Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 overflow-y-scroll h-[8rem]">
            {trip.categories.map((cat, index) => (
              <div
                key={index}
                className="flex justify-between bg-gray-100 px-3 py-2 rounded-md md:text-[11px] lg:text-[14px] h-fit"
              >
                <span className="text-gray-700 font-medium">{cat.name}</span>
                <span className="text-gray-600">
                  ₹{cat.budget.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex align-middle items-center justify-evenly mt-3.5">
          <button
            onClick={() => {
              navigate(`/trip/expenses/${trip._id}`);
            }}
            className=" bg-green-400 rounded-2xl px-4 py-2 font-bold hover:bg-green-500 hover:cursor-pointer "
          >
            Get Details
          </button>

          <button
            onClick={() => {
              dispatch(deleteData({ token, id: trip._id }));
              if (error) toast.error(error);
            }}
            className=" bg-red-400 rounded-2xl px-4 py-2 font-bold hover:bg-red-500 hover:cursor-pointer "
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(TripCard);
