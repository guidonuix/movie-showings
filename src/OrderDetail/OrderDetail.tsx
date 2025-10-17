import { useQuery } from "@tanstack/react-query";
import { type OrderType, type TheaterType } from "../types/types";
import ActionButtons from "./ActionButtons";
import Item from "./Item";

type Props = {
  orderId: number;
};

const OrderDetail = ({ orderId }: Props) => {
  const {
    isPending,
    error,
    data: orderData,
  } = useQuery<OrderType>({
    queryKey: ["orderDetail", orderId],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_DATABASE_ROOT_URL}/orders/${orderId}`
      );
      return response.json();
    },
  });

  const {
    data: theaterData,
    isPending: isTheaterPending,
    error: theaterError,
  } = useQuery<TheaterType[]>({
    queryKey: ["theaters"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_DATABASE_ROOT_URL}/theaters`
      );
      return response.json();
    },
  });

  const getTheaterName = (area: string) => {
    const theaterId = area.split(" ")[1];
    const theater = theaterData?.find((t) => t.id === Number(theaterId));
    return theater ? theater.name : "Unknown Theater";
  };

  if (isPending || isTheaterPending) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
        <span className="ml-3 text-gray-600 text-lg">
          Loading order details...
        </span>
      </div>
    );
  }

  if (error || theaterError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mx-4">
        <div className="flex items-center">
          <svg
            className="h-5 w-5 text-red-400 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-red-800 font-medium">
            Error loading order details
          </p>
        </div>
      </div>
    );
  }

  if (!orderData) return null;

  // Group items by person (firstName)
  const itemsByPerson = orderData.items.reduce(
    (acc, item) => {
      const person = item.firstName || "Unknown";
      if (!acc[person]) {
        acc[person] = [];
      }
      acc[person].push(item);
      return acc;
    },
    {} as Record<string, typeof orderData.items>
  );

  const subtotal = orderData.items.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal + orderData.tax + orderData.tip;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border mt-4">
      {/* Receipt Header */}
      <div className="bg-gray-900 text-white p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">DINNER & A MOVIE</h1>
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-sm">Order #{orderData.id}</p>
          <p className="text-xs text-gray-400">
            {formatDate(orderData.orderTime)}
          </p>
        </div>
      </div>

      {/* Order Details */}
      <div className="p-6 bg-gray-50 border-b">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Pickup Time:</p>
            <p className="font-medium">{formatDate(orderData.pickupTime)}</p>
          </div>
          <div>
            <p className="text-gray-600">Status:</p>
            <span
              className={`inline-block px-2 py-1 rounded-full text-xl font-bold ${
                orderData.status === "completed"
                  ? "bg-green-100 text-green-800 "
                  : orderData.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : orderData.status === "problem"
                      ? "bg-red-100 text-red-800 "
                      : "bg-gray-100 text-gray-800"
              }`}
            >
              {orderData.status.toUpperCase()}
            </span>
          </div>
        </div>
        {orderData.location && (
          <div className="mt-3 mb-3">
            <p className="text-gray-600 text-sm">Location:</p>
            <p className="font-medium">
              {getTheaterName(orderData.area)} - {orderData.location}
            </p>
          </div>
        )}
        {/* Wrapper to determine buttons */}
        <ActionButtons status={orderData.status} order={orderData} />
      </div>

      {/* Items by Person */}
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">
          Order Items
        </h2>

        {Object.entries(itemsByPerson).map(([person, items]) => (
          <div key={person} className="mb-6 last:mb-0">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">
                  {person.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900">{person}</h3>
            </div>

            <div className="ml-11 space-y-2">
              {items.map((item) => (
                <Item key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-gray-200 p-6 bg-gray-50">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax:</span>
            <span className="font-medium">${orderData.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tip:</span>
            <span className="font-medium">${orderData.tip.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-300 pt-2 mt-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="p-6 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <span className="text-sm text-gray-600">Payment Method:</span>
          </div>
          <span className="text-sm font-medium">
            •••• •••• •••• {orderData.creditCard.pan?.slice(-4)}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white p-4 text-center"></div>
    </div>
  );
};
export default OrderDetail;
