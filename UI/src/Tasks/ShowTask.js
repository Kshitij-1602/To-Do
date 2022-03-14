import React, { useState, useEffect } from "react";
import { BASE_URL } from "../env";
import "../Assests/css/ShowTask.css";
import { Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

/**
 *
 * The page is to show all the task details which uses the id for the task to render the details
 * IT shows the present data
 * dependencies to be imported
 * useparams takes the id for the particular task
 * navigates to the specified link
 * use state variables to stores data
 * @param - id -string
 */
const ShowTask = () => {
  let { id } = useParams();

  let navigate = useNavigate();

  const [values, setValues] = useState({
    task_name: "",
    description: "",
    state: "",
    comments: "",
    date: "",
    time: "",
  });

  /**
   *Use effect function will be updated every time the page is reloaded
   * This function is invoked on page load.
   *  Function to get all the task details from the backend.
   * This will hit the backend route with the given id and get all the details present as json.
   * The data is then parsed and set up in state variable for display and editing options.
   *  the returned response will be stored in state variable defined
   * sets the json data as received by get request
   * @params - values - object

   */

  useEffect(() => {
    fetch(BASE_URL + "/get-onetask/" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      //
      .then((res) => res.json())
      .then((data) => {
        setValues({
          task_name: `${data.task_name}`,
          description: `${data.description}`,
          state: `${data.state ? data?.state : ""}`,
          comments: `${data.comments ? data.comments : ""}`,
          date: `${data.date_time ? data.date_time.split("T")[0] : ""}`,
          time: `${
            data.date_time ? data.date_time.split("T")[1].slice(0, -1) : ""
          }`,
        });
      });
  }, []);

  /**
   * function to clear the form data
   * function the submit the newly added data
   * @params - form details
   * function checks the request is confirmed or not and then accesses the remove function to change the state value of the received task
   * @params - active_state - bool
   */

  const Remove = async () => {
    //This changes the task active status to false
    values.is_active = false;
    //passing the active state change detail
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

  const onDelete = async (event) => {
    event.preventDefault(); // Prevent default submission

    let confirmAction = confirm("Are you sure to execute this action?");

    if (confirmAction) {
      try {
        await Remove();
        //alert about success
        alert("Your Task was successfully Deleted!");
        navigate("/tasks");
      } catch (e) {
        //alert for failure
        alert(`Task failed! ${e.message}`);
      }
    } else {
      //alert for cancel
      alert("Request Cancelled");
    }
  };

  /**
   * return part that will render the form
   * won't be allow to select any of the details,bu only to see it.
   * form control events
   * @return - labels and input boxes.
   * user will have option to just see the task or delete if required.
   *
   */

  return (
    <div>
      <h2>Task : "{values.task_name}"</h2>
      <div>
        <Form className="forms" onSubmit={onDelete}>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Task Name
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                plaintext
                readOnly
                defaultValue={values.task_name}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Date
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
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
                type="text"
                plaintext
                readOnly
                value={values.time}
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
                plaintext
                readOnly
                value={values.description}
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
                plaintext
                readOnly
                value={values.comments}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              State
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                plaintext
                readOnly
                value={values.state}
              />
            </Col>
          </Form.Group>

          <div className="set-but">
            <button type="submit" className="btn btn-danger" id="del">
              Delete
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ShowTask;
