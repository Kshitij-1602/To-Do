import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { BASE_URL } from "./env";
// import Tasklist from "./Tasks/Tasklist";
import Newtask from "./Tasks/Newtask";
import EditTask from "./Tasks/EditTask";
import Navigation from "./Navigation";
import ShowTask from "./Tasks/ShowTask";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Tasks3 from "./Tasks/Tasks3";

const taskStates = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};
function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    fetch(BASE_URL + `/user-detail`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data.data?.name);
      });
  }, []);

  return (
    <div className="App">
      <Navigation data={user} />
      <br />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/tasks" element={<Tasks3 />} />
        <Route exact path="/showtask/:id" element={<ShowTask />} />
        <Route exact path="/new-tasks" element={<Newtask />} />
        <Route exact path="/edit-tasks/:id" element={<EditTask />} />
      </Routes>
      {/* footer */}
      <span
        style={{
          color: "#4b0082",
          fontSize: "18px",
          padding: "5px",
          fontWeight: "700",
          marginBottom: "10px",
        }}
      >
        <br />
        Developed by Kshitij Mohanka
      </span>
    </div>
  );
}

export default App;
export { taskStates };
