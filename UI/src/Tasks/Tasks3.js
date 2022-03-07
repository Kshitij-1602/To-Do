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

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
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

    {
      field: "Edit Tasks",
      headerName: "Edit",
      width: 80,
      renderCell: (y) => {
        return (
          <Link to={`/edit-tasks/${y.id}`}>
            <BiEdit size={30} />
          </Link>
        );
      },
    },
    {
      // field: "Edit Tasks",
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

  const columns = [
    { field: "task_name", headerName: "Task name", width: 250 },
    {
      field: "description",
      headerName: "Description",
      width: 300,
    },
    {
      field: "state",
      headerName: "State",
      width: 200,
      editable: true,
    },
    {
      field: "See Tasks",
      headerName: "See Tasks",
      width: 120,
      renderCell: (x) => {
        return (
          <Link to={`/showtask/${x.id}`}>
            <button type="button" class="btn btn-success">
              Show
            </button>
          </Link>
        );
      },
    },

    {
      field: "Edit Tasks",
      headerName: "Edit Tasks ",
      width: 120,
      renderCell: (y) => {
        return (
          <Link to={`/edit-tasks/${y.id}`}>
            <button type="button" className="btn btn-warning">
              Edit
            </button>
          </Link>
        );
      },
    },

    {
      // field: "Edit Tasks",
      headerName: "Status",
      width: 200,
      renderCell: (y) => {
        {
          if (y.row.state === taskStates.OPEN)
            return (
              <button
                type="button"
                className="btn btn-info"
                onClick={(e) => handlestate(y.row)}
              >
                Move to {taskStates.IN_PROGRESS}
              </button>
            );
          else if (y.row.state === taskStates.IN_PROGRESS)
            return (
              <button
                type="button"
                className="btn btn-info"
                onClick={(e) => handlestate(y.row)}
              >
                Move to {taskStates.COMPLETED}
              </button>
            );
          else
            return (
              <button
                type="button"
                className="btn btn-info"
                onClick={(e) => handlestate(y.row)}
              >
                Done{" "}
              </button>
            );
        }
      },
    },
  ];

  const handlestate = async (row) => {
    if (row.state === taskStates.OPEN) {
      row.state = taskStates.IN_PROGRESS;
    } else if (row.state === taskStates.IN_PROGRESS) {
      row.state = taskStates.COMPLETED;
    }
    const response = await fetch(BASE_URL + "/put-tasks/" + row.id, {
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

  return (
    <div data-testid="tasks-check">
      <h2>All Tasks page</h2>
      <Link to="/new-tasks">
        <button type="button" className="btn btn-secondary newtask">
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
