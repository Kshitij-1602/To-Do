import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navigation({ props }) {
  return (
    <>
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="https://img.icons8.com/color-glass/40/000000/to-do.png"
              alt="Icon"
            />
          </Navbar.Brand>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Navbar.Brand href="/tasks">Tasks </Navbar.Brand>
              <Nav.Link href="/new-tasks">New Task</Nav.Link> */}
              <Link to="/tasks" className="nav-link">
                Tasks
              </Link>
              <Link to="/new-tasks" className="nav-link">
                New Task
              </Link>
            </Nav>
            <Nav>
              <Navbar.Brand className="mt-2">Welcome , {props}</Navbar.Brand>

              <Nav.Link
                href="/logout"
                style={{ fontWeight: "800", color: "white" }}
              >
                <button type="button" className="btn btn-danger">
                  Log Out
                </button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
