import { createFileRoute } from "@tanstack/react-router";
import WaitersHome from "../components/WaitersHome";
import "../index.css";
import '../global.css'


const Index = () => {
  return (
    <>
      <WaitersHome />
    </>
  );
};
export const Route = createFileRoute("/")({
  component: Index,
});
