import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { Link } from "react-router-dom";
import { Post } from "../../Service/Api";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer ,toast} from "react-toastify";

function ViewGatebook() {
  const [gate, setGate] = useState([]);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    Post("getall", { tablename: "visitorgate" }).then((data) => {
      data && setGate(data);
    });
  }, [refresh]);
  const deleteGate = (id) => {
    Post("delete", { tablename: "visitorgate", id: id }).then(
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
                      <h6 class="mb-4">Gatebook details</h6>
                    </div>
                    <div className="col-2">
                      <Link className="btn btn-primary" to="/addgatebook">
                        Add New
                      </Link>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Visitor</th>
                          <th scope="col">Date</th>
                          <th scope="col">Contact</th>
                          <th scope="col">Purpose</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gate.map((value) => {
                          return (
                            <tr>
                              <td>{value.vname}</td>
                              <td>{value.date}</td>
                              <td>{value.contact}</td>
                              <td>{value.purpose}</td>

                              <td>
                                <Link
                                  className="btn btn-success"
                                  to="/editgatebook" state={{ id: value.id }}
                                >
                                  Edit
                                </Link>
                                &nbsp;&nbsp;
                                <button className="btn btn-danger" onClick={() => deleteGate(value.id)}>
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

export default ViewGatebook;
