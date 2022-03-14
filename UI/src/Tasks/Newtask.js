//This page is to render the create new task page

//importing all the required functionalities
import React, { useState } from "react";
import "../Assests/css/Newtask.css";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { BASE_URL } from "../env";
import { taskStates } from "../App";

/**
 *
 * The page is to render the the create new task page
 * dependencies to be imported
 * navigates to the specified link
 * use state variables to stores data
 * @param - values - object
 */
const Newtask = () => {
  let navigate = useNavigate();

  const [values, setValues] = useState({
    task_name: "",
    description: "",
    state: "",
    comments: "",
    date_time: new Date(),
  });

  //Function to set the new values
  const set = (name) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };
  /**
   *
   * This function is invoked on page load.
   *  This function will get the input data,save and post the data to the backend route defined and provide it with other details required.
   * This will hit the backend route with the given id and get all the details present as json.
   *   

   */

  const saveFormData = async () => {
    const response = await fetch(BASE_URL + "/post-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (response.status !== 201) {
      throw new Error(`Request failed: ${response.status}`);
    } else {
    }
  };
  /**
   * Function to set the new values
   * function to save the new form data
   * Function to post the new data
   * @params - values -object
   * function to clear the form data
   * function the submit data
   * @params - form details
   */
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

  /**
   * return part that will render the create new form form
   * form control events
   * @return - labels and input boxes.
   * This form has all the task labels and form input controls box for user to add details
   *
   */

  return (
    <div>
      <h2>Create New Task </h2>
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
                data-testid="datetime"
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
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Comments
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Optional"
                value={values.comments}
                onChange={set("comments")}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              State*
            </Form.Label>
            <Col sm="10">
              <Form.Select
                aria-label="Floating label select example"
                onChange={set("state")}
                value={values.state}
                placeholder="set state"
                required
              >
                <option value="" disabled selected hidden>
                  Choose state of task
                </option>
                <option defaultValue="open">{taskStates.OPEN}</option>
                <option values="in progress">{taskStates.IN_PROGRESS}</option>
                <option values="completed">{taskStates.COMPLETED}</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <div className="set-but">
            <button
              type="submit"
              className="btn btn-primary"
              id="but"
              disabled={!values.task_name || !values.state}
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
