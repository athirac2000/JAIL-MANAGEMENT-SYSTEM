import Sidebar from "../Sidebar";
import Nav from "../Nav";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Post } from "../../Service/Api";
import { ToastContainer, toast } from "react-toastify";

function AddJail() {
  const [jailname, setNameofjail] = useState();
  const [place, setPlace] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState();
  const navigate = useNavigate();




  const save = () => {
    let param = {
      jailname: jailname,
      place: place,
      description: description,
      type: type,
      tablename: "jails",
    };
 
    Post("save", param).then((data) => {
      if(data){
       navigate("/viewjail");
      setTimeout(() => {
        toast.success('Save successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }, 500)
    }//   setRefresh((prev) => prev + 1);
    })
  };

  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <Sidebar />
        <ToastContainer/>

        <div className="content">
          <Nav />

          <div className="col-sm-12 col-xl-12">
            <div className="bg-light rounded h-100 p-4">
              <h6 className="mb-4">Add New Jail</h6>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setNameofjail(event.target.value);
                  }}
                  id="floatingInput"
                  placeholder="enter jail name"
                />
                <label for="floatingInput">Jail Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setPlace(event.target.value);
                  }}
                  id="floatingInput"
                  placeholder="enter place"
                />
                <label for="floatingInput">Place</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                  id="floatingInput"
                  placeholder="enter desciption"
                />
                <label for="floatingInput">Description</label>
              </div>
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  onChange={(e) => setType(e.target.value)}
                >
                  <option selected>Select Type</option>
                  <option value="Central Jail">Central Jail</option>
                  <option value="Sub Jail">Sub Jail</option>
                  <option value="District Jail">District Jail</option>
                </select>
                <label for="floatingSelect">Select Type</label>
              </div>
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  save();
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddJail;
