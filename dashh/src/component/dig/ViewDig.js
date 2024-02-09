import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Post } from "../../Service/Api";
import { ToastContainer, toast } from "react-toastify";

function ViewDig() {
  const [DIG, setDIG] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    Post("getall", { tablename: "dig" }).then((data) => {
      data && setDIG(data);
    });
  }, [refresh]);

  const deleteDIG = (id) => {
    Post("deleteuser", { tablename: "dig", id: id }).then((data) => {
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
                      <h6 class="mb-4">DIG Details</h6>
                    </div>
                    <div className="col-2">
                      <Link className="btn btn-primary" to="/addDig">
                        Add New
                      </Link>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">DIG Name</th>

                          <th scope="col">Contact</th>
                          <th scope="col">Place</th>
                          <th scope="col">zone</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DIG.map((value,index) => {
                          return (
                            <tr>
                              <th scope="row">{index+1}</th>
                              <td>{value.username}</td>

                              <td>{value.contact}</td>
                              <td>{value.place}</td>
                              <td>{value.zone}</td>
                              <td>
                                <Link
                                  state={{ id: value.loginid }}
                                  className="btn btn-success"
                                  to="/editdig"
                                >
                                  Edit
                                </Link>
                                &nbsp;&nbsp;
                                <button
                                  onClick={() => deleteDIG(value.loginid)}
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

export default ViewDig;