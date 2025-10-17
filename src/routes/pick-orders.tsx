import { createFileRoute } from "@tanstack/react-router";
import PickOrder from "../PickOrder/PickOrder";

export const Route = createFileRoute("/pick-orders")({
  component: PickOrder,
});
