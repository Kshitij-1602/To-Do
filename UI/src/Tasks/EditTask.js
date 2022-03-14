import React, { useState, useEffect } from "react";
import "../Assests/css/Newtask.css";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { BASE_URL } from "../env";
import { taskStates } from "../App";

/**
 *
 * The page is to render the edit task page which uses the id for the task to render the details
 * IT shows the present data and allows the user to edit the input fields
 * dependencies to be imported
 * useparams takes the id for the particular task
 * navigates to the specified link
 * use state variables to stores data
 * @param - id -string
 */
const EditTask = () => {
  let { id } = useParams();

  let navigate = useNavigate();

  const [task, setTask] = useState({});
  const [values, setValues] = useState({
    task_name: "",
    description: "",
    state: "",
    comments: "",
    date_time: new Date(),
  });
  /**
   *
   * This function is invoked on page load.
   *  Function to get all the task details from the backend.
   * This will hit the backend route with the given id and get all the details present as json.
   * The data is then parsed and set up in state variable for display and editing options.
    
   * sets the json data as received by get request

   */

  useEffect(() => {
    fetch(BASE_URL + "/get-onetask/" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setTask(data);
        setValues({
          task_name: `${data.task_name}`,
          description: `${data?.description ? data.description : ""}`,
          state: `${data.state}`,
          comments: `${data.comments ? data.comments : ""}`,
          date_time: data.date_time,
          date: `${data.date_time ? data.date_time.split("T")[0] : ""}`,
          time: `${
            data.date_time ? data.date_time.split("T")[1].slice(0, -1) : ""
          }`,
        });
      });
  }, []);

  /**
   * Function to set the new values
   * function to save the update form data
   * Function to put the updated data for the id
   * @params - id - string
   * function to clear the form data
   * function the submit the newly added data
   * @params - form details
   */

  const set = (name) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };

  const saveFormData = async () => {
    const response = await fetch(BASE_URL + "/put-task/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (response.status !== 200) {
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
      date_time: "",
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    try {
      await saveFormData();
      //alert notification for success and failure
      alert("Your Task was successfully Edited!");
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
      //error message if failed
      alert(`Failed ${e.message}`);
    }
  };
  /**
   * return part that will render the editable form
   * form control events
   * @return - labels and input boxes.
   * This form has all the task labels and form input controls box for user to edit the data
   *
   */

  return (
    <div>
      <h2>Edit Task</h2>
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
                defaultValue={values.task_name}
                value={values.task_name}
                onChange={set("task_name")}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Date
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="date"
                plaintext
                readOnly
                value={values.date}
              />
            </Col>
            <Form.Label column sm="2">
              Time
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="time"
                plaintext
                readOnly
                value={values.time}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Set New Date-Time
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
              {/* State selection options  */}
              <Form.Select
                aria-label="Floating label select example"
                onChange={set("state")}
                value={values.state}
                placeholder="set state"
                required
              >
                <option></option>
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
              Update
            </button>
            <button
              type="reset"
              className="btn btn-secondary"
              id="but"
              disabled={
                !values.task_name && !values.description && !values.comments
              }
            >
              Clear All
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditTask;
