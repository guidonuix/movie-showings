import { useQuery } from "@tanstack/react-query";
import type { Order } from "../types/types";
import { useSelectedTheaterStore } from "../store/selectedTheaterStore";
import useAuth from "../hooks/useAuth";
import {
  sortOrdersByStatus,
  getOrderStatusColor,
} from "../utilites/orderHelper";
import { useNavigate } from "@tanstack/react-router";

const PickOrder = () => {
  const navigate = useNavigate();
  const { selectedTheaterId } = useSelectedTheaterStore();
  const { user, isAuthenticated } = useAuth();
  const { isPending, error, data } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_DATABASE_ROOT_URL}/orders`
      );
      return response.json();
    },
  });

  const orders =
    data?.filter((m) => m.area === `Theater ${selectedTheaterId}`) || [];
  const myOrders = sortOrdersByStatus(
    orders.filter((x) => x.userId === user?.id)
  );
  const otherOrders = sortOrdersByStatus(
    orders.filter((x) => x.userId !== user?.id)
  );
  if (isPending)
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600 text-lg">Loading theaters...</span>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-red-800 font-medium">Error loading theaters</p>
          </div>
        </div>
      </div>
    );

  if (!isAuthenticated) {
    navigate({ to: "/" });
    return;
  }

  return (
    <div className="orders-container max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">My Orders</h1>
      </div>

      <div className="space-y-4">
        {myOrders.map((order) => (
          <div
            key={order.id}
            className="w-full h-[70px] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex items-center px-6"
          >
            <div
              className={`w-3 h-3 rounded-full mr-4 ${getOrderStatusColor(order.status)}`}
            ></div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {order.area}
              </h3>
              <p className="text-sm text-gray-600">Order ID: {order.id}</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 font-medium uppercase">
                {order.status}
              </span>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                onClick={() => navigate({ to: `/order-detail/${order.id}` })}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Other Orders</h1>
      </div>
      <div className="space-y-4">
        {otherOrders.map((order) => (
          <div
            key={order.id}
            className="w-full h-[70px] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex items-center px-6"
          >
            <div
              className={`w-3 h-3 rounded-full mr-4 ${getOrderStatusColor(order.status)}`}
            ></div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {order.area}
              </h3>
              <p className="text-sm text-gray-600">Order ID: {order.id}</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 font-medium uppercase">
                {order.status}
              </span>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                onClick={() => navigate({ to: `/order-detail/${order.id}` })}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PickOrder;
