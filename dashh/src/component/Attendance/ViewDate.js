import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { Post } from "../../Service/Api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function ViewDate() {
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();
  const [prisoners, setPrisoners] = useState([]);
  const [date, setDate] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState({});

  const userdata = JSON.parse(localStorage.getItem("userdata"));
  useEffect(() => {
    let param = {
      tablename: "prisoner",
      jail_id: userdata.jailid,
    };
    console.log('apsara',param);
    Post("getbydata", param).then((data) => {
      data && setPrisoners(data);
      const initialAttendanceStatus = {};
      data.forEach((prisoner) => {
        initialAttendanceStatus[prisoner.id] = "Present";
      });
      setAttendanceStatus(initialAttendanceStatus);
    });
  }, [refresh]);

  const handleRadioChange = (e, prisonerId) => {
    const value = e.target.value;
    setAttendanceStatus((prevAttendanceStatus) => ({
      ...prevAttendanceStatus,
      [prisonerId]: value,
    }));
  };




  const handleSaveAttendance = () => {
    const attendanceData = {
      date: date,
      attendance: attendanceStatus,
      jail_id: userdata.jailid,
    };
  console.log(attendanceData);
    // Send the attendance data to the API endpoint
    Post("attendance", attendanceData)
      .then((response) => {
        toast.success("Attendance saved successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  
        // Reset the attendance status
        const initialAttendanceStatus = {};
        prisoners.forEach((prisoner) => {
          initialAttendanceStatus[prisoner.id] = "Present";
        });
        setAttendanceStatus(initialAttendanceStatus);
      })
      .catch((error) => {
        toast.error("Failed to save attendance", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  




  return (
    <>
      <div class="container-fluid pt-4 px-4">
        <Sidebar />
        <ToastContainer/>
        <div class="content">
          <Nav />

          <div class="container-fluid pt-4 px-4">
            <div class="row g-4">
              <div class="col-12">
                <div class="bg-light rounded h-100 p-4">
                  <div className="row">
                    <div className="col-10">
                      <h4 class="mb-4">Attendance Marking</h4>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-1">
                      <label style={{ color: "green" }}>
                        <b>Date</b>
                      </label>
                    </div>
                    <div className="col-4">
                      <input
                        type="date"
                        onChange={(e) => setDate(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div
                    className="container col-12"
                    style={{ backgroundColor: "#e8fccf", height: "100vh" }}
                  >
                    <div className="row mt-5">
                      <div className="col-6 mt-5">
                        <label>
                          <b>Prisoner's Name</b>
                        </label>
                      </div>
                      <div className="col-4 mt-5">
                        <label>
                          <b>Attendance Status</b>
                        </label>
                      </div>
                      {prisoners.map((prisoner) => {
                        return (
                          <div className="row mt-4" key={prisoner.id}>
                            <div className="col-6">
                              <input
                                type="text"
                                value={prisoner.name}
                                className="form-control text-dark"
                                onChange={(e)=>setPrisoners(e.target.value)}
                              ></input>
                            </div>

                            <div className="col-4">
                              <div className="form-check form-check-inline">
                                <input
                                  type="radio"
                                  id={`present-${prisoner.id}`}
                                  name={`attendance-${prisoner.id}`}
                                  value="Present"
                                  checked={
                                    attendanceStatus[prisoner.id] === "Present"
                                  }
                                  onChange={(e) =>
                                    handleRadioChange(e, prisoner.id)
                                  }
                                  className="form-check-input"
                                />
                                <label
                                  htmlFor={`present-${prisoner.id}`}
                                  className="form-check-label"
                                >
                                  Present
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  type="radio"
                                  id={`absent-${prisoner.id}`}
                                  name={`attendance-${prisoner.id}`}
                                  value="Absent"
                                  checked={
                                    attendanceStatus[prisoner.id] === "Absent"
                                  }
                                  onChange={(e) =>
                                    handleRadioChange(e, prisoner.id)
                                  }
                                  className="form-check-input"
                                />
                                <label
                                  htmlFor={`absent-${prisoner.id}`}
                                  className="form-check-label"
                                >
                                  Absent
                                </label>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="row mt-4">
                      <div className="col-12">
                        <button
                          className="btn btn-success"
                          onClick={handleSaveAttendance}
                        >
                          Save Attendance
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewDate;
