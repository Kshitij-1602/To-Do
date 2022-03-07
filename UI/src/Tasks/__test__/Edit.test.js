import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditTask from "../EditTask";
import { BrowserRouter } from "react-router-dom";

//Check if the previous Task Details are present with Update and clear option is enabled

const MockEdit = () => {
  return (
    <BrowserRouter>
      <EditTask />
    </BrowserRouter>
  );
};
test("Particular Task visible", async () => {
  render(<MockEdit />);
  userEvent.type(screen.getByLabelText(/task name/i), "abc");

  expect(await screen.findByRole("button", { name: /update/i })).toBeEnabled();
  expect(
    await screen.findByRole("button", { name: /clear all/i })
  ).toBeEnabled();
});
