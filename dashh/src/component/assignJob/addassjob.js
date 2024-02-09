import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import { Post } from "../../Service/Api";
function AddassJob() {
    const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();
  const [prisoner, setprisoner] = useState([]);
  const [prisoner_id, setprisoner_id] = useState();
  const [stime, setStartTime] = useState();
  const [date, setDate] = useState();
  const [etime, setEndTime] = useState();
  const [job, setjob] = useState([]);
  const [job_id, setjob_id] = useState();
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem('userdata'))
    let param = {
      tablename:'prisoner',
      jail_id:userdata.jailid
    }
    Post("getbydata", param).then((data) => {
      data && setprisoner(data);
    });
    Post("getall", { tablename: "job" }).then((data) => {
      data &&   setjob(data);
    });
  }, [refresh]);
  const save = () => {
    
   
    let datefor = '01/01/2023'
    let start_time = new Date(datefor +' '+ stime)
    let end_time = new Date(datefor +' '+etime)


    if(start_time>end_time){
      toast.error('Invalid From And To', {
        position: "top-right",
        autoClose: 30000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return false
    }
    



    let param = {
      prisoner_id: prisoner_id,
      stime: stime,
      etime: etime,
      date: date,
      job_id:job_id,
      tablename: "job_assign",
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
        navigate("/viewassjob");
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
              <h6 className="mb-4">Add New assigned jobs</h6>
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
                  type="time"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="enter time" onChange={(e) => setStartTime(e.target.value)}
                />
                <label for="floatingPassword">Starting time</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="time"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="enter time" onChange={(e) => setEndTime(e.target.value)}
                />
                <label for="floatingPassword">Ending time</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="enter time" onChange={(e) => setDate(e.target.value)}
                />
                <label for="floatingPassword">Date</label>
              </div>
              
              <div className="form-floating mb-3">
              <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  onChange={(e) => setjob_id(e.target.value)}
                >
                  <option selected>Select Job</option>
                  {job.map((value) => {
                    return (
                      <>
                        <option value={value.id}>{value.title}</option>
                      </>
                    );
                  })}
                </select>
                <label for="floatingInput">Job</label>
              </div>

              <button className="btn btn-primary" onClick={() => save()}>Assign Job</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddassJob;
