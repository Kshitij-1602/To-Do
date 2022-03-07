import React from "react";
import { Card } from "react-bootstrap";
import logo from "./Assests/images/logo.png";
const Home = () => {
  return (
    <div>
      <div style={{ margin: "50px", marginLeft: "37%" }}>
        <Card style={{ width: "45%", border: "none" }}>
          <Card.Img variant="top" src={logo} style={{ borderRadius: "50px" }} />
          <Card.Body>
            <Card.Title>To Do List</Card.Title>
            <Card.Text>
              Welcome to the Home page of the To-Do List application.
              <br />
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Home;
