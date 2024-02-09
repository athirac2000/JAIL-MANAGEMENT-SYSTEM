import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { Post } from "../../Service/Api";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function AddjailSup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [place, setPlace] = useState("");
  const [contact, setContact] = useState("");
  const [jails, setJails] = useState([]);
  const [selectedJail, setSelectedJail] = useState("Select jail");
  const navigate = useNavigate();
  const location = useLocation();
 
  useEffect(() => {
    Post("getall", { tablename: "jails" }).then((data) => {
      data && setJails(data);
    });
    let param = {
      tablename: "jailsuperintendent",
      loginid: location.state.id,
    };
    Post("getuserbyid", param).then((data) => {
      data && setName(data.username);
      setContact(data.contact);
      setEmail(data.email);
      setPlace(data.place);
      setSelectedJail(data.jailid);
    });
  }, []);
  const save = () => {
    let param = {
      username: name,
      place: place,
      contact: contact,
      email: email,
      id: location.state.id,
      jailid: selectedJail,
      tablename: "jailsuperintendent",
    };
    Post("updateuser", param).then((data) => {
      if(data){
        navigate("/viewjailSup");
      setTimeout(() => {
        toast.success('Update successfully!', {
          position: 'top-right',
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
        <ToastContainer/>

        <div className="content">
          <Nav />

          <div className="col-sm-12 col-xl-12">
            <div className="bg-light rounded h-100 p-4">
              <h6 className="mb-4">Add New superintendent</h6>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="floatingInput">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingEmail"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingEmail">Email</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingLocation"
                  placeholder="enter location"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                />
                <label htmlFor="floatingLocation">Location</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingContact"
                  placeholder="enter contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                <label htmlFor="floatingContact">Contact</label>
              </div>
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  value={selectedJail}
                  onChange={(e) => setSelectedJail(e.target.value)}
                >
                  <option disabled>Select jail</option>
                  {jails.map((value) => {
                    return <option value={value.id}>{value.jailname}</option>;
                  })}
                </select>
                <label htmlFor="floatingSelect">Select jail</label>
              </div>

              <button className="btn btn-primary" onClick={save}>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddjailSup;
