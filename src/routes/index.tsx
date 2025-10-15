import { createFileRoute } from "@tanstack/react-router";
const Index = () => {
  return (
    <>
      <h1>Home page</h1>
      More content here.
    </>
  );
};
export const Route = createFileRoute('/')({
  component: Index,
});
