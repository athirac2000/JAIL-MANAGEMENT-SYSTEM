import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Post } from "../../Service/Api";
import { ToastContainer, toast } from "react-toastify";
function ViewJail() {
  const [jails, setJails] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let param ={
      tablename:'jails'
    }
    Post("getall", param).then((data) => {
      data && setJails(data);
    });
  }, [refresh]);

  const deleteJail = (id) => {
    Post("delete", { tablename: "jails", id: id }).then((data) => {
      data && setRefresh((prev) => prev + 1);
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
                      <h6 class="mb-4">Jail Details</h6>
                    </div>
                    <div className="col-2">
                      <Link className="btn btn-primary" to="/addjail">
                        Add New
                      </Link>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Jail Name</th>
                          <th scope="col">Place</th>
                          <th scope="col">Type</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jails.map((value, index) => {
                          return (
                            <tr>
                              <th scope="row">{index + 1}</th>
                              <td>{value.jailname}</td>
                              <td>{value.place}</td>
                              <td>{value.type}</td>
                              <td>
                                <Link
                                  className="btn btn-success"
                                  to="/editjail"
                                  state={{ id: value.id }}
                                >
                                  Edit
                                </Link>
                                &nbsp;&nbsp;
                                <button
                                  onClick={() => deleteJail(value.id)}
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

export default ViewJail;
