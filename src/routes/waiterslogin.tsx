import { createFileRoute } from "@tanstack/react-router";
import WaitersLogin from "../components/WaitersLogin";

export const Route = createFileRoute("/waiterslogin")({
  component: WaitersLogin,
});
