import React from "react";
import { Card } from "react-bootstrap";
import logo from "./Assests/images/logo.png";
/**
 * home page to return the components of root page
 * importing important dependencies
 * function return the task image logo with the basic details about the application
 */
//the
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
