import React, { useState, useEffect } from "react";
import { BASE_URL } from "../env";
import "../Assests/css/ShowTask.css";
import { Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

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

  useEffect(() => {
    fetch(BASE_URL + "/get-onetask/" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
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

  const Remove = async () => {
    values.is_active = false;
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

  const onDelete = async (event) => {
    event.preventDefault(); // Prevent default submission
    try {
      await Remove();
      alert("Your Task was successfully Deleted!");
      navigate("/tasks");
    } catch (e) {
      alert(`Task failed! ${e.message}`);
    }
  };

  return (
    <div>
      <h2>ShowTask</h2>
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
          <Row className="state">
            <Col md>
              <Form.Label column sm="4">
                Comments
              </Form.Label>
              <Form.Control
                type="text"
                plaintext
                readOnly
                value={values.comments}
              />
            </Col>
            <Col md>
              <Form.Label column sm="4">
                State
              </Form.Label>
              <Form.Select
                aria-label="Floating label select example"
                plaintext
                readOnly
                value={values.state}
                required
                disabled
                selected
              >
                <option></option>
                <option values="open">Open</option>
                <option values="in progress">In Progress</option>
                <option values="completed">Completed</option>
              </Form.Select>
              {/* </FloatingLabel> */}
            </Col>
          </Row>
          <button type="submit" className="btn btn-danger" id="del">
            Delete
          </button>
        </Form>
      </div>
    </div>
  );
};

export default ShowTask;
