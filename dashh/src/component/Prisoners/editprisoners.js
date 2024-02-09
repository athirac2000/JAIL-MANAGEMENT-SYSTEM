import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { ImgUrl, Post, handlefileupload } from "../../Service/Api";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";

function EditPrisoners() {
  const [name, setName] = useState("");
  const [loc, setLocation] = useState("");
  const [crime, setCrime] = useState("");
  const [age, setAge] = useState("");

  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");
  const [jails, setJail] = useState([]);
  const [jail_id, setJail_id] = useState();
  const [cell, setCell] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const [grades, setGrades] = useState([]);
  const [grade_id, setgrade_id] = useState();
  const [prisonorDetails, setprisonorDetails] = useState([]);
  const location=useLocation();
  const [gender, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    Post("getall", { tablename: "prisoner" }).then((data) => {
      data && setprisonorDetails(data);
    });
    Post("getall", { tablename: "jails" }).then((data) => {
      data && setJail(data);
    });

    Post("getall", { tablename: "grade" }).then((data) => {
      data && setGrades(data);
    });
    let param = { 
      tablename: "prisoner",
      id: location.state.id,
    };
    Post("getbyid", param).then((data) => {
      data && setName(data.name);
      setLocation(data.location);
      setCrime(data.crime);
      setAge(data.age);
      setSdate(data.sdate);
      setEdate(data.edate);
      setJail_id(data.jail_id);
      setCell(data.cell);
      setImage(data.image);
      setgrade_id(data.grade_id);
      setSelectedOption(data.gender)
    });
  }, []);

  const save = () => {
    let param = {
        name: name,
        location: loc,
        crime: crime,
        gender:gender,
        age:age,
        sdate: sdate,
        edate: edate,
        grade_id: grade_id,
        cell: cell,
        image: image,
        tablename: "prisoner",
      id: location.state.id,
      
    };
    Post("update", param).then((data) => {
      if(data){
        navigate("/");
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

  const fileupload = (e) => {
    handlefileupload(e).then((data) => {
      data && setImage(data);
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
              <h6 className="mb-4">Edit Prisoner</h6>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="enter name"
                  onChange={(e) => setName(e.target.value)} value={name}
                />
                <label for="floatingInput">Enter The Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="enter location"
                  onChange={(e) => setLocation(e.target.value)} value={loc}
                />
                <label for="floatingPassword">Enter The Location</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="enter crime" value={crime}
                  onChange={(e) => setCrime(e.target.value)}
                />
                <label for="floatingPassword">Enter The Crime</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="enter crime" value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                <label for="floatingPassword">Enter The Age</label>
              </div>

              <div className="form-floating mb-3 row">
                <div className="col-3">
                <label>
                  <input 
                    type="radio"
                    value="male"
                    checked={gender === "male"}
                    onChange={handleOptionChange}
                  />
                  &nbsp;Male
                </label>
                </div>

                <div className="col-3">
                <label>
                  <input 
                    type="radio"
                    value="female"
                    checked={gender === "female"}
                    onChange={handleOptionChange}
                  />
                  &nbsp;Female
                </label>
                </div>

                <div className="col-3">
                <label>
                  <input 
                    type="radio"
                    value="other"
                    checked={gender === "other"}
                    onChange={handleOptionChange}
                  />
                  &nbsp;Transgender
                </label>
                </div>
                
              </div>

              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="enter date" value={sdate}
                  onChange={(e) => setSdate(e.target.value)}
                />
                <label for="floatingPassword">Sentence start date</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="enter date" value={edate}
                  onChange={(e) => setEdate(e.target.value)}
                />
                <label for="floatingPassword">Sentence end date</label>
              </div>

           

              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  onChange={(e) => setgrade_id(e.target.value)} value={grade_id}
                >
                  <option selected>Select Grade</option>
                  {grades.map((value) => {
                    return (
                      <>
                        <option value={value.id}>{value.title}</option>
                      </>
                    );
                  })}
                </select>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="enter crime"
                  onChange={(e) => setCell(e.target.value)} value={cell}
                />
                <label for="floatingPassword">Enter your cell number</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="file"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="enter location"
                  onChange={(e) => fileupload(e.target.files[0])}
                />
                <label for="floatingPassword">Upload photo</label>
                <img src={ImgUrl+image} width={"100px"} height={"100px"} style={{marginTop:"10px"}}></img>

              </div>
              <button className="btn btn-primary" onClick={()=>save()}>Update</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPrisoners;
