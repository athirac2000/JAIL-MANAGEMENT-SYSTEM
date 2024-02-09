import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { Post } from "../../Service/Api";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useEffect } from "react";
function EditJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [jobs, setJob] = useState([]);
  const [charge, setCharge] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    Post("getall", { tablename: "job" }).then((data) => {
      data && setJob(data);
    });
    let param = {
      tablename: "job",
      id: location.state.id,
    };
    Post("getbyid", param).then((data) => {
      data && setTitle(data.title);
      setDescription(data.description);
      setCharge(data.charge);
    });
  }, []);

  const save = () => {
    if (!title|| !description|| !charge.trim()) {
      toast.error("please fill all fields", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    let param = {
      title: title,
      description: description,
      charge: charge,
      id: location.state.id,
      tablename: "job",
    };
    Post("update", param).then((data) => {
      if(data){
        navigate("/viewjob");
      setTimeout(() => {
        toast.success("Update successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }, 500);
    }
    });
  };
  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <Sidebar />
        <div className="content">
          <Nav />
          <ToastContainer/>

          <div className="col-sm-12 col-xl-12">
            <div className="bg-light rounded h-100 p-4">
              <h6 className="mb-4">Edit Job</h6>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder=""
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label for="floatingInput">Title</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder=""
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label for="floatingInput">Description</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control" value={charge}
                  id="floatingInput"
                  onChange={(e) => setCharge(e.target.value)}
                  placeholder=""
                />
                <label for="floatingInput"> Enter Charge Per Hour(₹)</label>
              </div>

              <button className="btn btn-primary" onClick={() => save()}>
                update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditJob;
