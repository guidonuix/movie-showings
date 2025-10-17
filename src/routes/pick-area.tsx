import { createFileRoute } from "@tanstack/react-router";
import PickArea from "../PickArea/PickArea";

export const Route = createFileRoute("/pick-area")({
  component: PickArea,
});