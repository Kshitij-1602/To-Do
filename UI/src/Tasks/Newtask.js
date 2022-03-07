import React, { useState } from "react";
import "../Assests/css/Newtask.css";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { BASE_URL } from "../env";
import { taskStates } from "../App";
const Newtask = () => {
  let navigate = useNavigate();

  const [values, setValues] = useState({
    task_name: "",
    description: "",
    state: "",
    comments: "",
    date_time: new Date(),
  });
  const set = (name) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };

  const saveFormData = async () => {
    const response = await fetch(BASE_URL + "/post-tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (response.status !== 201) {
      throw new Error(`Request failed: ${response.status}`);
    } else {
    }
  };
  const clearFormData = async () => {
    setValues({
      task_name: "",
      description: "",
      state: "",
      comments: "",
      date_time: new Date(),
    });
  };
  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    try {
      await saveFormData();
      alert("Your Task was successfully submitted!");
      navigate("/tasks");
    } catch (e) {
      alert(`Task failed! ${e.message}`);
    }
  };
  const onReset = async (e) => {
    e.preventDefault();
    try {
      await clearFormData();
    } catch (e) {
      alert(`Failed ${e.message}`);
    }
  };

  return (
    <div>
      <h2>Create New Task page </h2>
      <div>
        <Form className="forms" onSubmit={onSubmit} onReset={onReset}>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Task Name*
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                required
                placeholder="Add Task Name"
                value={values.task_name}
                onChange={set("task_name")}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Date & Time
            </Form.Label>
            <Col sm="2">
              <input
                type="datetime-local"
                value={values.date_time}
                onChange={set("date_time")}
                min={new Date().toISOString().slice(0, -8)}
                id="date"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Description
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Add Task Deatils"
                value={values.description}
                onChange={set("description")}
              />
            </Col>
          </Form.Group>
          <Row className="state">
            <Col md>
              <Form.Label column sm="4">
                Comments
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Optional"
                value={values.comments}
                onChange={set("comments")}
              />
            </Col>
            <Col md>
              <Form.Label column sm="4">
                State*
              </Form.Label>
              <Form.Select
                aria-label="Floating label select example"
                placeholder="Set State"
                onChange={set("state")}
                value={values.state}
                required
              >
                <option defaultValue="open">{taskStates.OPEN}</option>
                <option values="in progress">{taskStates.IN_PROGRESS}</option>
                <option values="completed">{taskStates.COMPLETED}</option>
              </Form.Select>
              {/* </FloatingLabel> */}
            </Col>
          </Row>
          <div className="set-but">
            <button
              type="submit"
              className="btn btn-primary"
              id="but"
              disabled={!values.task_name && !values.state}
            >
              Save
            </button>
            <button
              type="reset"
              className="btn btn-secondary"
              id="but"
              disabled={
                !values.task_name && !values.description && !values.comments
              }
            >
              Reset
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Newtask;
