import { render, screen, cleanup } from "@testing-library/react";
import App from "./App";
import Navigation from "./Navigation";
import { BrowserRouter } from "react-router-dom";

//Check The App.js Page

const MockApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

test("Should render Home Page", () => {
  render(<MockApp />);
  expect(true).toBe(true);
});

//Check the Navbar page and the logout button
const MockTodo = () => {
  return (
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
};

test("Check Log-Out button rendering", async () => {
  render(<MockTodo />);

  expect(await screen.findByRole("button", { name: /log out/i })).toBeEnabled();
});
