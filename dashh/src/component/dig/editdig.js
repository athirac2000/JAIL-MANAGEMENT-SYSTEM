import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { useEffect, useState } from "react";
import { Post } from "../../Service/Api";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function EditDig() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [place, setPlace] = useState();
  const [contact, setContact] = useState();
  const [gender, setGender] = useState();
  const [zone, setZone] = useState(); 
  const navigate = useNavigate();
  const location = useLocation();

 
  const save = () => {
    let param = {
      username: name,
      place: place,
      contact: contact,
      gender: gender,
      email: email,
      zone:zone,
      id: location.state.id,
      tablename: "dig",
    };
    Post("updateuser", param).then((data) => {
      if(data){
       navigate("/viewdig");
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

  useEffect(() => {
    let param = {
      tablename: "dig",
      loginid: location.state.id,
    };

    Post("getuserbyid", param).then((data) => {
      data && setName(data.username);
      setContact(data.contact);
      setEmail(data.email);
      setPlace(data.place);
      setGender(data.gender);
      setZone(data.zone);
    });
  }, []);

  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <Sidebar />
        <ToastContainer/>

        <div className="content">
          <Nav />

          <div className="col-sm-12 col-xl-12">
            <div className="bg-light rounded h-100 p-4">
              <h6 className="mb-4">Add New Dig</h6>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  value={name}
                  className="form-control"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  id="floatingInput"
                  placeholder="enter name"
                />
                <label for="floatingInput">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={place}
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setPlace(event.target.value);
                  }}
                  id="floatingPassword"
                  placeholder="Penter location"
                />
                <label for="floatingPassword">Location</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={contact}
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setContact(event.target.value);
                  }}
                  id="floatingPassword"
                  placeholder="enter contact"
                />
                <label for="floatingPassword">Contact</label>
              </div>
              <div className="form-floating mb-3">
                <select
                  value={gender}
                  className="form-select"
                  onChange={(event) => {
                    setGender(event.target.value);
                  }}
                  id="floatingSelect"
                  aria-label="Floating label select example"
                >
                  <option selected>Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>
                <label for="floatingSelect">Select gender</label>
              </div>
              <div className="form-floating mb-3">
                <select
                  value={zone}
                  className="form-select"
                  onChange={(event) => {
                    setZone(event.target.value);
                  }}
                  id="floatingSelect"
                  aria-label="Floating label select example"
                >
                  <option selected>Select zone</option>
                  <option>Central zone</option>
                  <option>South zone</option>
                  <option>North zone</option>
                </select>
                <label for="floatingSelect">Select gender</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={email}
                  type="email"
                  className="form-control"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  id="floatingPassword"
                  placeholder="name@example.com"
                />
                <label for="floatingPassword">Email</label>
              </div>
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  save();
                }}
              >
                Edit
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditDig;