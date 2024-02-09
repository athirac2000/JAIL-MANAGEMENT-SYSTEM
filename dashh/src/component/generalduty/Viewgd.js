import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Post } from "../../Service/Api";
import { ToastContainer,toast } from "react-toastify";
function Viewgd() {
  const [generalduty, setgeneralduty] = useState([]);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    
    let param = {
      tablename: "generalduty",
    };
    Post("getGeneralduty", param).then((data) => {
      data && setgeneralduty(data);
      console.log(data);
    });
  }, [refresh]);
  const deleteGeneral=(id)=>{
    Post('deleteuser',{tablename:'generalduty',id:id}).then((data)=>{
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
                      <h6 class="mb-4">General Duty details</h6>
                    </div>
                    <div className="col-2">
                      <Link className="btn btn-primary" to="/addgd">
                        + Add New
                      </Link>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Contact</th>
                          <th scope="col">Email</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {generalduty.map((value) => {
                          return (
                            <tr>
                              <td>{value.name}</td>
                              <td>{value.contact}</td>
                              <td>{value.email}</td>
                              
                              <td>
                                <Link className="btn btn-success" state={{id:value.loginid}} to="/editgd">
                                  Edit
                                </Link>
                                &nbsp;&nbsp;
                                <button className="btn btn-danger" onClick={()=>deleteGeneral(value.loginid)}>
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

export default Viewgd;
