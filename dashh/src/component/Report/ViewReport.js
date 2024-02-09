import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { useLocation } from "react-router-dom";
import { ImgUrl, Post } from "../../Service/Api";

function ViewReport() {
  const location = useLocation();
  const [attendence, setAttendence] = useState([]);
  const [jailname, setJailName] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [authenticate, setauthenticate] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  useEffect(() => {
    let param = { tablename: "attendence", date: location.state.date };
    Post("getattendenceReport", param).then((data) => {
      data && setAttendence(data);
      setJailName(data[0].jailname)
    });
    Post("getjobreport", param).then((data) => {
      data && console.log(data)
      setJobs(data);
    });
  }, [location.state.date]);

  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <Sidebar />
        <div className="content">
          <Nav />

          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-12">
                <div className="bg-light rounded h-100 p-4 mb-4">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr style={{ backgroundColor: "#3a0ca3" }}>
                          <th colSpan="4" className="text-white">
                            Attendance Report
                          </th>
                        </tr>
                        <tr style={{ backgroundColor: "#000",color:'white' }}>
                        <th>Jail Name: {jailname}</th>
                        <th>Superintendant Name: {authenticate.username}</th>
                          <th colSpan="3"></th>
                        </tr>
                        <tr style={{ backgroundColor: "#3a0ca3" }}>
                          <th>Image</th>
                          <th>Prisoner name</th>
                          <th>Crime</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody style={{ backgroundColor: "#bbd0ff" }}>
                        {attendence.map((prisoner) => (
                          <tr key={prisoner.id}>
                            <td>
                              <img
                                src={ImgUrl + prisoner.image}
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  borderRadius: "60px",
                                }}
                                alt={prisoner.name}
                              />
                            </td>
                            <td style={{ color: "black" }}>{prisoner.name}</td>
                            <td style={{ color: "black" }}>{prisoner.crime}</td>
                            <td>
                              <h6
                                style={{
                                  color:
                                    prisoner.attendance === "Present"
                                      ? "green"
                                      : "red",
                                }}
                              >
                                {prisoner.attendance}
                              </h6>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div
                    className="table-responsive"
                    style={{ marginTop: "-17px" }}
                  >
                    <table className="table">
                      <thead>
                        <tr style={{ backgroundColor: "#bbd0ff" }}>
                          <th colSpan="5" style={{ color: "#3a0ca3" }}>
                            Job Report
                          </th>
                        </tr> 
                        <tr style={{ backgroundColor: "#bbd0ff" }}>
                          <th>Image</th>
                          <th>Prisoner name</th>
                          <th>Job</th>
                          <th>Start Time</th>
                          <th>End Time</th>
                        </tr>
                      </thead>
                      <tbody style={{ backgroundColor: "#bbd0ff" }}>
                        {jobs.map((jobvalue) => (
                          <tr key={jobvalue.id}>
                            <td>
                              <img
                                src={ImgUrl + jobvalue.image}
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  borderRadius: "60px",
                                }}
                                alt={jobvalue.name}
                              />
                            </td>
                            <td style={{ color: "black" }}>{jobvalue.name}</td>
                            
                              
                              <React.Fragment key={jobvalue.id}>
                                <td style={{ color: "black" }}>
                                  {jobvalue.title}
                                </td>
                                <td>
                                  <h6 style={{ color: "black" }}>
                                    {jobvalue.stime}
                                  </h6>
                                </td>
                                <td>
                                  <h6 style={{ color: "black" }}>
                                    {jobvalue.etime}
                                  </h6>
                                </td>
                              </React.Fragment>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewReport;
