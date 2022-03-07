import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShowTask from "../ShowTask";
import { BrowserRouter } from "react-router-dom";

//Check if the Task Details are present and delete option is enabled

const MockShow = () => {
  return (
    <BrowserRouter>
      <ShowTask />
    </BrowserRouter>
  );
};
test("Particular Task visible", async () => {
  render(<MockShow />);

  expect(await screen.findByRole("button", { name: /delete/i })).toBeEnabled();
});
