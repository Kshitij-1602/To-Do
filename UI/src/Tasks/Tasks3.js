//

//importing the importatn dependencies
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { BASE_URL } from "../env.js";
import { Link } from "react-router-dom";
import { GoBook } from "react-icons/go";
import { BiEdit } from "react-icons/bi";
import { FaLockOpen } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { MdFileDownloadDone } from "react-icons/md";
import { taskStates } from "../App.js";

/**
 *
 * Page to return all the tasks present for the user.
 * dependencies to be imported
 * function is to get the dimensions of the browser page
 * function to use the dimensions of the browser page
 */

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
//this
function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
/**
 * columns for defined data in tables
 * different header column values passed with header name and width
 * @params - object data
 * @returns -the page
 */

const Tasks3 = () => {
  const column2 = [
    { field: "task_name", headerName: "Task name", width: 200 },

    {
      field: "See Tasks",
      headerName: "See",
      width: 80,
      renderCell: (x) => {
        return (
          <Link to={`/showtask/${x.id}`}>
            <GoBook size={30} />
          </Link>
        );
      },
    },
    //

    {
      field: "Edit Tasks",
      headerName: "Edit",
      width: 80,
      renderCell: (y) => {
        return (
          <Link to={`/edit-task/${y.id}`}>
            <BiEdit size={30} />
          </Link>
        );
      },
    },

    {
      headerName: "Status",
      width: 80,
      renderCell: (y) => {
        {
          if (y.row.state === taskStates.OPEN)
            return (
              <a onClick={(e) => handlestate(y.row)}>
                <FaLockOpen size={25} />
              </a>
            );
          else if (y.row.state === taskStates.IN_PROGRESS)
            return (
              <a onClick={(e) => handlestate(y.row)}>
                <GrInProgress size={25} />
              </a>
            );
          else
            return (
              <a onClick={(e) => handlestate(y.row)}>
                <MdFileDownloadDone size={25} />
              </a>
            );
        }
      },
    },
  ];

  //column defined to view the table headers and details in normal view
  const columns = [
    { field: "task_name", headerName: "Task name", width: 230 },
    {
      field: "description",
      headerName: "Description",
      width: 300,
    },

    {
      field: "state",
      headerName: "State",
      width: 150,
      editable: true,
    },
    //field with buttons and link

    {
      field: "See Tasks",
      headerName: "Action Buttons",
      width: 550,
      sortable: false,
      renderCell: (x) => {
        return (
          <div className="d-flex">
            <div style={{ marginRight: "20px" }}>
              <Link to={`/showtask/${x.id}`}>
                <button
                  type="button"
                  class="btn btn-success"
                  style={{ marginLeft: "20px" }}
                >
                  Show
                </button>
              </Link>
              <Link to={`/edit-task/${x.id}`}>
                <button
                  type="button"
                  className="btn btn-warning"
                  style={{ marginLeft: "20px" }}
                >
                  Edit
                </button>
              </Link>
            </div>
            {x.row.state === taskStates.OPEN ? (
              <button
                type="button"
                className="btn btn-info"
                onClick={(e) => handlestate(x.row)}
              >
                Move to {taskStates.IN_PROGRESS}
              </button>
            ) : (
              <div>
                {x.row.state === taskStates.IN_PROGRESS ? (
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={(e) => handlestate(x.row)}
                  >
                    Move to {taskStates.COMPLETED}
                  </button>
                ) : (
                  <MdFileDownloadDone size={25} />
                )}
              </div>
            )}
          </div>
        );
      },
    },
  ];
  /**
 * function to manage status of the task
 * allow the user to edit the task status from the table itself
 * function to put the updated status from the table itself
 * @params - values -object
 * function to get all the tasks present for the given user
 * parses the received data and checks if the is_active value is true or false
 
 */

  const handlestate = async (row) => {
    if (row.state === taskStates.OPEN) {
      row.state = taskStates.IN_PROGRESS;
    } else if (row.state === taskStates.IN_PROGRESS) {
      row.state = taskStates.COMPLETED;
    }

    const response = await fetch(BASE_URL + "/put-task/" + row.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`);
    } else {
    }
  };

  const [tasklist, setTasklist] = useState([]);
  const [values, setValues] = useState({
    task_name: "",
    description: "",
    state: "",
    comments: "",
    date_time: new Date(),
  });

  const { height, width } = useWindowDimensions();
  let x = width;

  //
  const getall = () => {
    fetch(BASE_URL + `/get-tasks`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        for (let i = 0; i < data.length; i++) {
          if (data[i].is_active == false) {
            data.splice(i, 1);
            i--;
          }
        }
        setTasklist(data);
        setValues({
          task_name: `${data.task_name}`,
          description: `${data?.description ? data.description : ""}`,
          state: `${data.state}`,
          comments: `${data.comments ? data.comments : ""}`,
          date_time: data.date_time,
        });
      });
  };
  useEffect(() => {
    getall();
  }, []);

  /**
   * Renders the my task page
   * table with sort,edit,filter,search, pagination and other features
   * variuos actions buttons
   */
  return (
    <div>
      <h2>My Tasks</h2>
      <Link to="/new-task">
        <button
          type="button"
          className="btn btn-secondary newtask mt-2"
          style={{ padding: "10px 20px" }}
        >
          Add New Task
        </button>
      </Link>
      {x > 768 ? (
        <div style={{ height: 400, width: "95%", margin: "30px" }}>
          <DataGrid rows={tasklist} columns={columns} pageSize={5} />
        </div>
      ) : (
        <div style={{ height: 650, margin: "30px", width: "95%" }}>
          <DataGrid rows={tasklist} columns={column2} pageSize={10} />
        </div>
      )}
    </div>
  );
};
export default Tasks3;
