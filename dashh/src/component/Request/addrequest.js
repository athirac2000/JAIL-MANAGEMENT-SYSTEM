import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { useState } from "react";
import { Post } from "../../Service/Api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function AddRequest() {
  const [title, settitle] = useState();
  const [description, setDescription] = useState();
  const [date, setdate] = useState();
  const [authenticate, setAuthenticate] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  console.log(authenticate);
  const navigate = useNavigate();
  const save = () => {
    let param = {
      title: title,
      description: description,
      date: date,
      userid: authenticate.loginid,
      requeststatus: '0',

      tablename: "requests",
    };
    Post("save", param).then((data) => {
      if(data){
        toast.success("Save successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate("/viewrequest");
      }, 700);
    }
    });
  };
  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <Sidebar />
        <ToastContainer />

        <div className="content">
          <Nav />

          <div className="col-sm-12 col-xl-12">
            <div className="bg-light rounded h-100 p-4">
              <h6 className="mb-4">Add New request</h6>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder=""
                  onChange={(e) => settitle(e.target.value)}
                />
                <label for="floatingInput">Enter The Title</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder=""
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label for="floatingInput">Enter The Description</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="floatingInput"
                  placeholder=""
                  onChange={(e) => setdate(e.target.value)}
                />
                <label for="floatingInput">Enter The Date</label>
              </div>

              <button className="btn btn-primary" onClick={() => save()}>
                Send Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddRequest;
