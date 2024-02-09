import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { Link } from "react-router-dom";
import { Post } from "../../Service/Api";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function ViewMessage() {
  const [message, setmessage] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [authentcate, setauthentcate] = useState(JSON.parse(localStorage.getItem("userdata")));
  useEffect(() => {
    Post("getMessages", { tablename: "message",user_id: authentcate.loginid}).then((data) => {
      data && setmessage(data);
      console.log('testing',data)
    });
  }, [refresh]);

  const deleteMessage = (id) => {
    Post("delete", { tablename: "message", id: id }).then((data) => {
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
        <ToastContainer />
        <div class="content">
          <Nav />

          <div class="container-fluid pt-4 px-4">
            <div class="row g-4">
              <div class="col-12">
                <div class="bg-light rounded h-100 p-4">
                  <div className="row">
                    <div className="col-10">
                      <h6 class="mb-4">Message details</h6>
                    </div>
                    <div className="col-2">
                      <Link className="btn btn-primary" to="/sendmessage">
                        Send message
                      </Link>
                    </div>
                  </div>
                  <div class="table-responsive">
                    
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Subject</th>
                          <th scope="col" style={{width:"25%"}}>Message</th>
                          <th scope="col">Reply</th>

                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {message.map((value) => {
                          return (
                            <tr>
                              <td>{value.subject}</td>
                              <td>{value.message}</td>
                              <td>
                                {value.replay==null?(
                                  <button
                                  class="btn text-dark" style={{backgroundColor:"#fb8500"}}
                                  type="button"
                                  disabled
                                >
                                  <span
                                    class="spinner-grow spinner-grow-sm"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                  Pending...
                                </button>
                                ):(
                                  <button className="btn" style={{backgroundColor:"greenyellow"}}>{value.replay}</button>
                                )}
                                
                              </td>
                              <td>
                                <Link
                                  className="btn btn-success"
                                  to="/messageview"
                                  state={{ id: value.mid }}
                                >
                                  Edit
                                </Link>
                                &nbsp;&nbsp;
                                <button
                                  className="btn btn-danger"
                                  onClick={() => deleteMessage(value.mid)}
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

export default ViewMessage;
