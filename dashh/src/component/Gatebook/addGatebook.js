import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { Post } from "../../Service/Api";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function AddGatebook() {
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();
  const [prisoner, setprisoner] = useState([]);
  const [prisoner_id, setprisoner_id] = useState();
  const [date, setdate] = useState();
  const [vname, setvname] = useState();
  const [purpose, setpurpose] = useState();
  const [contact, setcontact] = useState();


  

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    let param = {
      tablename: "prisoner",
      jail_id: userdata.jailid,
    };
    Post("getbydata", param).then((data) => {
      data && setprisoner(data);
    });
  }, [refresh]);
  const save = () => {
    let param = {
      prisoner_id: prisoner_id,
      date: date,
      vname: vname,
      purpose:purpose,
      contact:contact,
      tablename: "visitorgate",
    };
    Post("save", param).then((data) => {
      if(data){
        toast.success("Save successfully!", {
        position: "top-right",
        autoClose: 30000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate("/viewGatebook");
      }, 700);
    }
    });
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
              <h6 className="mb-4">Add New </h6>
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  onChange={(e) => setprisoner_id(e.target.value)}
                >
                  <option selected>Select Prisoner</option>
                  {prisoner.map((value) => {
                    return (
                      <>
                        <option value={value.id}>{value.name}</option>
                      </>
                    );
                  })}
                </select>
                <label for="floatingInput">Prisoner Name</label>
              </div>

              
              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Enter date" onChange={(e) => setdate(e.target.value)}
                />
                <label for="floatingPassword">Date</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Enter Visitor Name" onChange={(e) => setvname(e.target.value)}
                />
                <label for="floatingPassword">Visitor Name</label>
              </div>


              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Enter Visiting Purpose" onChange={(e) => setpurpose(e.target.value)}
                />
                <label for="floatingPassword">Visiting Purpose</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Enter Contact Number" onChange={(e) => setcontact(e.target.value)}
                />
                <label for="floatingPassword">Contact Number</label>
              </div>

              
              

              <button className="btn btn-primary" onClick={()=>save()}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddGatebook;
