import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { Post, handlefileupload } from "../../Service/Api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
function AddPrisoners() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
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
  const [gender, setSelectedOption] = useState("");



  const userdata = JSON.parse(localStorage.getItem('userdata'))
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    Post("getall", { tablename: "jails" }).then((data) => {
      data && setJail(data);
    });

    Post("getall", { tablename: "grade" }).then((data) => {
      data && setGrades(data);
    });
  }, [refresh]);
  const save = () => {


    let startdate = new Date(sdate)
    let enddate = new Date(edate)

    if(startdate>=enddate){      
      toast.error("Start and End Date Doesnot Match");
      return false;
    }  
    let param = {
      name: name,
      location: location,
      crime: crime,
      sdate: sdate,
      edate: edate,
      jail_id: userdata.jailid,
      grade_id: grade_id,
      cell: cell,
      image: image,     
      age: age,
      gender:gender,
      tablename: "prisoner",
    };
    Post("save", param).then((data) => {
      
      if(data){ navigate("/");
      setTimeout(() => { toast.success("Save successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
     
       
      }, 700);
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
              <h6 className="mb-4">Add New Prisoner</h6>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="enter name"
                  onChange={(e) => setName(e.target.value)}
                />
                <label for="floatingInput">Enter The Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="enter location"
                  onChange={(e) => setLocation(e.target.value)}
                />
                <label for="floatingPassword">Enter The Location</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="enter crime"
                  onChange={(e) => setCrime(e.target.value)}
                />
                <label for="floatingPassword">Enter The Crime</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="enter crime"
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
                  placeholder="enter date"
                  onChange={(e) => setSdate(e.target.value)}
                />
                <label for="floatingPassword">Sentence start date</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="enter date"
                  onChange={(e) => setEdate(e.target.value)}
                />
                <label for="floatingPassword">Sentence end date</label>
              </div>
 

              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  onChange={(e) => setgrade_id(e.target.value)}
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
                  onChange={(e) => setCell(e.target.value)}
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
              </div>
              <button className="btn btn-primary" onClick={() => save()}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPrisoners;
