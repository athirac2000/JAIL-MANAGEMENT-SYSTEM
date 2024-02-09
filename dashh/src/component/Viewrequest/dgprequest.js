import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Post } from "../../Service/Api";
import { ToastContainer, toast } from "react-toastify";

function DGPRequest() {
  const [requests, setrequests] = useState([]);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    let param = {
      tablename: "requests",
    };
    Post("getdgprequests", param).then((data) => {
      data && setrequests(data);
      console.log(data);
    });
  }, [refresh]);
  const approve = (rid) => {
    let param = {
      rid: rid,
      tablename: "requests",
    };
    Post("approve", param).then((data) => {
      data && toast.success("Approve successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.reload();
      }, 700);
    });
  };

  const handover = (rid) => {
    let param = {
      rid: rid,
      tablename: "requests",
    };
    Post("handover", param).then((data) => {
      data && toast.success("Handover To DGP!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.reload();
      }, 700);
    });
  };
  return (
    <>
      <div class="container-fluid pt-4 px-4">
        <Sidebar />
        <ToastContainer />
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
                  </div>
                  {requests.map((value) => {
                    return (
                      <div class="card mt-2">
                        <h5
                          class="card-header text-white"
                          style={{ backgroundColor: "#03045e" }}
                        >
                          {value.title}
                        </h5>
                        <div
                          class="card-body"
                          style={{ backgroundColor: "#023e8a" }}
                        >
                          <div class="card-title text-white">
                            <i class="fa-solid fa-user-nurse text-white"></i>{" "}
                            Request From: {value.username}
                          </div>
                          <div class="card-title text-white">
                            Date: {value.date}
                          </div>
                          <p class="card-text text-white">
                            {value.description}
                          </p>

                          <div className="row">
                            <div className="col-2">
                              <button
                                type="button"
                                class="btn btn-success btn-floating"
                                onClick={() => approve(value.rid)}
                              >
                                <i class="fa-regular fa-thumbs-up"></i> Approve
                              </button>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DGPRequest

