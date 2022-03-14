import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { BASE_URL } from "./env";
import Newtask from "./Tasks/Newtask";
import EditTask from "./Tasks/EditTask";
import Navigation from "./Navigation";
import ShowTask from "./Tasks/ShowTask";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Footer } from "./Footer";
import Tasks3 from "./Tasks/Tasks3";

/**
 * object data to save the status of the task and store it as a common componenet between all
 */

const taskStates = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

/**
 * Main page responsible for all pages and routes
 * application can be viewed and rendered in all types of screen sizes
 * importing important dependencies
 * @returns
 */
function App() {
  const [user, setUser] = useState();

  //function to get the user details
  useEffect(() => {
    fetch(BASE_URL + `/user-detail`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      });
  }, []);
  /**
   * return function has all the routes and pages defined here.
   * page serves as the virtual DOM for the application where all changes happens inside the virtual DOM
   */

  return (
    <div className="App">
      <Navigation data={user} />
      <br />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/tasks" element={<Tasks3 />} />

        <Route exact path="/showtask/:id" element={<ShowTask />} />
        <Route exact path="/new-task" element={<Newtask />} />
        <Route exact path="/edit-task/:id" element={<EditTask />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
export { taskStates };
