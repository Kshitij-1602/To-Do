//The
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * navbar present at the top of all pages
 * functional components with links to different routes throughout the application
 * @returns - links
 * responsible for rendering, redirecting and linking to different pages of the DOM
 */

const Navigation = (props) => {
  console.log(props.data?.name);
  const user_name = props.data?.name.split(" ")[0];
  //the navbar is collapsable and visible in all screen sizes
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
              <Link to="/tasks" className="nav-link">
                Tasks
              </Link>
              <Link to="/new-task" className="nav-link">
                New Task
              </Link>
            </Nav>
            <Nav>
              <Navbar.Brand className="mt-2" style={{ color: "#00BFFF" }}>
                Welcome , {user_name}
              </Navbar.Brand>

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
};

export default Navigation;
