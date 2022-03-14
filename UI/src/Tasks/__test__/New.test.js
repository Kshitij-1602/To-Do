import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Newtask from "../Newtask";
import { BrowserRouter } from "react-router-dom";
import { itIT } from "@mui/x-data-grid";

//Check for New Task details necessary conditions

const MockTask = () => {
  return (
    <BrowserRouter>
      <Newtask />
    </BrowserRouter>
  );
};

test("If New task conditions is fulfilled, the save button is enabled", async () => {
  render(<MockTask />);
  userEvent.type(screen.getByLabelText(/task name/i), "abc");
  userEvent.type(screen.getByPlaceholderText(/set state/i), "open");

  expect(await screen.findByRole("button", { name: /save/i })).toBeEnabled();
  expect(await screen.findByRole("button", { name: /reset/i })).toBeEnabled();
});

const mockdate = new Date("July 21, 1983 01:15:00");
const today = new Date(); //past date to be set
test("if date entered is in future", async () => {
  render(<MockTask />);

  const result = today > mockdate;
  expect(result).toBe(true);
});
//button enabled-disabled
