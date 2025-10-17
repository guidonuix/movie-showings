import { createFileRoute } from "@tanstack/react-router";
import OrderDetail from "../../OrderDetail/OrderDetail";

export const Route = createFileRoute("/order-detail/$orderId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { orderId } = Route.useParams();

  return (
    <>
      <OrderDetail orderId={orderId ? Number(orderId) : 1001} />
    </>
  );
}
