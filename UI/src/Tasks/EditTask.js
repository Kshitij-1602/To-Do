import React, { useState, useEffect } from "react";
import "../Assests/css/Newtask.css";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { BASE_URL } from "../env";

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
  // This will get the task details
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

  //this will set the new values
  const set = (name) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };
  //redirect to task page after edit
  const saveFormData = async () => {
    const response = await fetch(BASE_URL + "/put-tasks/" + id, {
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
      alert(`Failed ${e.message}`);
    }
  };

  return (
    <div>
      <h2>Edit the Tasks</h2>
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
                // placeholder={task.task_name}
                // plaintext
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
                onChange={set("state")}
                value={values.state}
                required
              >
                <option></option>
                <option values="open">Open</option>
                <option values="in progress">In Progress</option>
                <option values="completed">Completed</option>
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
