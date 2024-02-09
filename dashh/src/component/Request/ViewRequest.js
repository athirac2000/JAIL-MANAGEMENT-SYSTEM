import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Post } from "../../Service/Api";
import { ToastContainer, toast } from "react-toastify";
function ViewRequest() {
  const [requests, setrequests] = useState([]);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    let param = {
      tablename: "requests",
    };
    Post("getall", param).then((data) => {
      data && setrequests(data);
      console.log(data);
    });
  }, [refresh]);
  const deleteRequest=(id)=>{
    Post('delete',{tablename:'requests',id:id}).then((data)=>{
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
                      <h6 class="mb-4">Request details</h6>
                    </div>
                    <div className="col-2">
                      <Link className="btn btn-primary" to="/addrequest">
                        Add New
                      </Link>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Title</th>
                          <th scope="col">Description</th>
                          <th scope="col">Date</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requests.map((value) => {
                          return (
                            <tr>
                              <td>{value.title}</td>
                              <td>{value.description}</td>
                              <td>{value.date}</td>
                              <td>
                                {value.requeststatus==1?(

                                  <button className="btn" style={{color:"blue"}}>Approve</button>
                                ):(

                                <button className="btn" style={{color:"orange"}}>Pending</button>
                                )}

                                </td>
                              <td>
                                <Link
                                  className="btn btn-success" state={{id:value.id}}
                                  to="/editrequest"
                                >
                                  Edit
                                </Link>
                                &nbsp;&nbsp;
                                <button className="btn btn-danger" onClick={()=>deleteRequest(value.id)}>
                                  Delete
                                </button>
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

export default ViewRequest;
