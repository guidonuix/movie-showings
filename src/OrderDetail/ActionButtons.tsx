import { QueryClient, useMutation } from "@tanstack/react-query";
import type { OrderType } from "../types/types";

interface ActionButtonsProps {
  status: string;
  order: OrderType;
}

const ActionButtons = (props: ActionButtonsProps) => {
  const queryClient = new QueryClient();
  const { mutateAsync: updateOrderStatus } = useMutation({
    mutationFn: async (newStatus: string) => {
      // Simulate an API call to update the order status
      fetch(`${import.meta.env.VITE_DATABASE_ROOT_URL}/updateOrderStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...props.order, status: newStatus }),
      });
      queryClient.invalidateQueries({
        queryKey: ["orderDetail", props.order.id],
      });
    },
  });

  switch (props.status) {
    case "readyForGuest":
      return (
        <div className="flex gap-4">
          <button
            className=" hover:bg-green-600 text-white font-bold py-2 px-4 rounded bg-blue-500"
            onClick={async () => {
              await updateOrderStatus("pickedUp");
            }}
          >
            Picked up
          </button>
          <button
            className="bg-red-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={async () => {
              await updateOrderStatus("problem");
            }}
          >
            Problem
          </button>
        </div>
      );
    case "pickedUp":
      return (
        <div className="flex gap-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={async () => {
              await updateOrderStatus("delivered");
            }}
          >
            Delivered
          </button>
          <button
            className="bg-red-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={async () => {
              await updateOrderStatus("problem");
            }}
          >
            Problem
          </button>
        </div>
      );
    case "new":
      return (
        <div className="flex gap-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={async () => {
              await updateOrderStatus("delivered");
            }}
          >
            Delivered
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={async () => {
              await updateOrderStatus("problem");
            }}
          >
            Problem
          </button>
        </div>
      );
    case "delivered":
      return (
        <div className="flex gap-4">
          <button className="bg-red-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Problem
          </button>
        </div>
      );
    case "problem":
      return (
        <div className="flex gap-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={async () => {
              await updateOrderStatus("completed");
            }}
          >
            Completed
          </button>
        </div>
      );
    default:
      return null;
  }
};
export default ActionButtons;
