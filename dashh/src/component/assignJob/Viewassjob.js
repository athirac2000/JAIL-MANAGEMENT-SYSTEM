import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Post } from "../../Service/Api";
function ViewassJob() {
  const [Assignedjob, setAssignedjob] = useState([]);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem('userdata'))

    let param =  { tablename: "job_assign" , jail_id:userdata.jailid }
    Post("getalljobassign",param).then((data) => {
      data && setAssignedjob(data); 
    });
  }, [refresh]);

  const deleteJob=(id)=>{
    Post('delete',{tablename:'job_assign',id:id}).then((data)=>{
      toast.error("Delete successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        setRefresh(prev=>prev+1)
      }, 700);
    })
  }
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
                      <h6 class="mb-4">Assigned jobs</h6>
                    </div>
                    <div className="col-2">
                      <Link className="btn btn-primary" to="/addassjob">
                        Add New
                      </Link>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Prisoner Name</th>
                          <th scope="col">Starting time</th>
                          <th scope="col">Ending time</th>
                          <th scope="col">Date</th>
                          <th scope="col">job name</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Assignedjob.map((value) => {
                          return (
                            <>
                              <tr>
                                <td>{value.name}</td>
                                <td>{value.stime}</td>
                                <td>{value.etime}</td>
                                <td>{value.date}</td>
                                <td>{value.title}</td>

                                <td>
                                  <Link
                                    className="btn btn-success"
                                    to="/editassjob"
                                    state={{id:value.assignid}}
                                  >
                                    Edit
                                  </Link>
                                  &nbsp;&nbsp;
                                  <button className="btn btn-danger" onClick={()=>deleteJob(value.assignid)}>
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            </>
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

export default ViewassJob;
