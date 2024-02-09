import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Post } from "../../Service/Api";
import { ToastContainer, toast } from "react-toastify";

function Messages() {
  const [messages, setmessage] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [showReply, setShowReply] = useState(false);
  const[replay,setReplay]=useState();
  useEffect(() => {
    let param = {
      tablename: "message",
    };
    Post("getadminMessages", param).then((data) => {
      console.log(data)
      data && setmessage(data);
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


  const saveReplay = (mid) => {
    let params = {
      mid: mid,
      replay:replay,
      tablename: "replay",
    }; 
    console.log(params)
    // return 
    Post("save", params).then((data) => {
      data && toast.success("Replay Send successfully!", {
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
                      <h6 class="mb-4">All Messages</h6>
                    </div>
                  </div>
                  {messages.map((value) => {
                    return (
                      <div class="card mt-2">
                        <h5
                          class="card-header"
                          style={{ backgroundColor: "#bc6c25" }}
                        >
                          {value.subject}
                        </h5>
                        <div
                          class="card-body"
                          style={{ backgroundColor: "#d5bdaf" }}
                        >
                          <img
                            src="./img/noti.png"
                            style={{ height: "50px", width: "50px" }}
                          ></img>
                          <div class="card-title text-dark">
                            <i class="fa-solid fa-user-nurse text-dark"></i>{" "}
                            <b>Message:</b> {value.message}
                          </div>

                          <p class="card-text text-white">
                            {value.description}
                          </p>

                          <div className="row">
                            <div className="col-2">
                              <button
                                type="button"
                                class="btn btn-floating text-white"
                                style={{ backgroundColor: "#582f0e" }}
                                onClick={() => setShowReply(!showReply)}
                              >
                                <i class="fa-brands fa-replyd"></i> Reply
                              </button>
                            </div>

                            {showReply && (
                              <div className="mt-4">
                                <textarea
                                  className="form-control"
                                  placeholder="Write your reply here..." onChange={(e)=>setReplay(e.target.value)}
                                  rows={2}
                                  // Add the necessary logic to handle the reply submission
                                ></textarea>
                                <button className="btn mt-2 text-white" style={{backgroundColor:"#bc6c25"}} onClick={()=>saveReplay(value.mid)}>
                                  Send Reply
                                </button>
                              </div>
                            )}
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

export default Messages;
