import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Post } from "../../Service/Api";
function Editgd() {
  const [refresh, setRefresh] = useState(0);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [authenticate, setAuthenticate] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    Post("getByGeneralId", {
      tablename: "generalduty",
      id: location.state.id,
    }).then((data) => {
      data && setName(data.name);
      setEmail(data.email);
      setContact(data.contact);
      console.log(data);
    });
  }, [refresh]);

  const save = () => {
    let param = {
      name: name,
      email: email,
      contact: contact,
      id:location.state.id,
      tablename: "generalduty",
    };
    Post("updateuser", param).then((data) => {
      if(data){
        toast.success("Update successfully!", {
        position: "top-right",
        autoClose: 30000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate("/viewgd");
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
              <h6 className="mb-4">Edit details</h6>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label for="floatingInput">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label for="floatingInput">Email</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  placeholder=""
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                <label for="floatingPassword">Contact</label>
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

export default Editgd;
