import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Post } from "../../Service/Api";
import { ToastContainer, toast } from "react-toastify";
function ViewGrades() {
    const [grades, setGrades] = useState([]);
  const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        Post("getall", { tablename: "grade" }).then((data) => {
      data &&       setGrades(data);
        });
      }, [refresh]);
      const deleteGrade = (id) => {
        Post("delete", { tablename: "grade", id: id }).then(
          (data) => {
        setRefresh((prev) => prev + 1);

            toast.error("Deleted successfully!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              className: "custom-toast-success",
            });
          }
        );
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
                      <h6 class="mb-4">Grades</h6>
                    </div>
                    <div className="col-2">
                      <Link className="btn btn-primary" to="/addgrades">
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
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                       {grades.map((value)=>{
                        return(
                            <>
                            
                        <tr>
                          <td>{value.title}</td>
                          <td>{value.description}</td>
                          <td>
                            <Link className="btn btn-success" to="/editgrades" state={{ id: value.id }}>
                              Edit
                            </Link>
                            &nbsp;&nbsp;
                            <button className="btn btn-danger" onClick={() => deleteGrade(value.id)}>Delete</button>
                          </td>
                        </tr>
                        </>
                        )
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

export default ViewGrades;
