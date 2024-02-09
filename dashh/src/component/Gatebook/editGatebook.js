import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation} from "react-router-dom";

import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Post } from "../../Service/Api";
function Editgatebook() {
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();
  const [prisoner, setprisoner] = useState([]);
  const [prisoner_id, setprisoner_id] = useState();
  const [date, setdate] = useState();
  const [vname, setvname] = useState();
  const [purpose, setpurpose] = useState();
  const [contact, setcontact] = useState();
  const location = useLocation()

  useEffect(() => {
    Post("getall", { tablename: "prisoner" }).then((data) => {
      data && setprisoner(data);
    });

    Post("getbyid", { tablename: "visitorgate", id: location.state.id }).then(
      (data) => {
        setprisoner_id(data.prisoner_id);
        setdate(data.date);
        setvname(data.vname);
        setpurpose(data.purpose);
        setcontact(data.contact);
      }
    );
  }, [refresh]);
  const save = () => {
    let param = {
        prisoner_id: prisoner_id,
        date: date,
        vname: vname,
        purpose:purpose,
        contact:contact,
        tablename: "visitorgate",
      id:location.state.id
    };
    Post("update", param).then((data) => {
     if(data){
      setTimeout(() => {
        navigate("/viewGatebook");
      }, 700);
       toast.success("Update successfully!", {
         position: "top-right",
         autoClose: 3000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
       });
      
     }
    });
  };
  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <Sidebar />
        <div className="content">
          <Nav />

          <div className="col-sm-12 col-xl-12">
            <div className="bg-light rounded h-100 p-4">
              <h6 className="mb-4">Edit details</h6>
              <div className="form-floating mb-3">
              <select
                    className="form-select"
                    id="floatingSelect"
                    value={prisoner_id}
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
                  placeholder="Enter date" value={date}
                  onChange={(e) => setdate(e.target.value)}
                />
                <label for="floatingPassword">Date</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Enter Visitor Name" value={vname}
                  onChange={(e) => setvname(e.target.value)}
                />
                <label for="floatingPassword">Visitor Name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control" value={purpose}
                  id="floatingPassword"
                  placeholder="Enter Visiting Purpose"
                  onChange={(e) => setpurpose(e.target.value)}
                />
                <label for="floatingPassword">Visiting Purpose</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="number" value={contact}
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Enter Contact Number"
                  onChange={(e) => setcontact(e.target.value)}
                />
                <label for="floatingPassword">Contact Number</label>
              </div>

              <button className="btn btn-primary" onClick={() => save()}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Editgatebook;
