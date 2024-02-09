import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { useState } from "react";
import { Post } from "../../Service/Api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Addgd() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [contact, setContact] = useState();
  const [authenticate, setAuthenticate] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const navigate = useNavigate();

  const save = () => {
    let param = {
      name: name,
      email: email,
      password: password,
      contact: contact,
      jailid: authenticate.jailid,
      usertype: "3",
      tablename: "generalduty",
    };
    Post("saveuser", param).then((data) => {
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
              <h6 className="mb-4">Add New general duty</h6>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder=""
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
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label for="floatingInput">Email</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingInput"
                  placeholder=""
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label for="floatingInput">Password</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  placeholder=""
                  onChange={(e) => setContact(e.target.value)}
                />
                <label for="floatingPassword">Contact</label>
              </div>

              <button className="btn btn-primary" onClick={() => save()}>
                Save General Duty
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addgd;
