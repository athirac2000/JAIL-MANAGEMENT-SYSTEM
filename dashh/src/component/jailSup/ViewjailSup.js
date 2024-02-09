import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Post } from "../../Service/Api";
import { ToastContainer, toast } from "react-toastify";

function ViewJailSup() {
  const [jailSup, setJailSup] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    Post("getall", { tablename: "jailsuperintendent" }).then((data) => {
      data && setJailSup(data);
    });
  }, [refresh]);

  const deleteJailSup = (id) => {
    Post("deleteuser", { tablename: "jailsuperintendent", id: id }).then(
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
                      <h6 class="mb-4">Jail Superintendent Details</h6>
                    </div>
                    <div className="col-2">
                      <Link className="btn btn-primary" to="/addjailsup">
                        Add New
                      </Link>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Superintendent Name</th>
                          <th scope="col">Location</th>
                          <th scope="col">Contact</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jailSup.map((value, index) => {
                          return (
                            <tr>
                              <th scope="row">{index + 1}</th>
                              <td>{value.username}</td>
                              <td>{value.place}</td>
                              <td>{value.contact}</td>
                              <td>
                                <Link
                                  className="btn btn-success"
                                  to="/editjailsup"
                                  state={{ id: value.loginid }}
                                >
                                  Edit
                                </Link>
                                &nbsp;&nbsp;
                                <button
                                  onClick={() => deleteJailSup(value.loginid)}
                                  className="btn btn-danger"
                                >
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

export default ViewJailSup;
