import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { Link } from "react-router-dom";
import { Post } from "../../Service/Api";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function Report() {
  const [reports, setreports] = useState([]);
  const [refresh, setRefresh] = useState(0);
  
  useEffect(() => {
    Post("getallattendence", { tablename: "attendence" }).then((data) => {


      let uniquedate = [...new Set(data.map(item => item.date))];
      console.log(uniquedate)
      setreports(uniquedate);
    });

  }, [refresh]);
  return (
    <>
      <div class="container-fluid pt-4 px-4">
        <Sidebar />
        <div class="content">
          <Nav />

          <div class="container-fluid pt-4 px-4">
            <div class="row g-4">
              <div class="col-12">
                <div class="bg-light rounded h-100 p-4">
                  <div className="row">
                    <div className="col-10">
                      <h6 class="mb-4">Reports</h6>
                    </div>
                   
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col" style={{color:"#3626a7"}}>Attendence Date</th>
                          <th scope="col"style={{color:"#3626a7"}}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reports.map((value) => {
                          return (
                            <tr>
                              <td className="text-dark"><i class="fa-regular fa-calendar-days" style={{color:"#3626a7"}}></i> {value}</td>

                              <td>
                                <Link
                                  className="btn btn-floating text-white" state={{date:value}}
                                  to="/viewreport" style={{backgroundColor:"#3626a7"}}
                                >
                                    <i class="fa-solid fa-eye text-white"></i>&nbsp;
                                  View report
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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

export default Report;
