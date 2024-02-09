import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { Post } from "../../Service/Api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
function AddGrades() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const save = () => {
    let param = {
      title: title,
      description: description,
      tablename: " grade",
    };
    Post("save", param).then((data) => {
      if(data){toast.success("Save successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      setTimeout(() => {
      navigate("/viewgrades");
        
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
              <h6 className="mb-4">Add New grades</h6>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder=""
                />
                <label for="floatingInput">Title</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="" 
                />
                <label for="floatingInput">Description</label>
              </div>

              <button className="btn btn-primary" onClick={save}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default AddGrades;
