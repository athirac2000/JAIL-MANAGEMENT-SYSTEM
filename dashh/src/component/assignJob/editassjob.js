import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import { Post } from "../../Service/Api";
function EditassJob() {
    const [refresh, setRefresh] = useState(0);
    const navigate = useNavigate();
    const [prisoner, setprisoner] = useState([]);
    const [prisoner_id, setprisoner_id] = useState();
    const [stime, setStartTime] = useState();
    const [date, setDate] = useState();
    const [etime, setEndTime] = useState();
    const [job, setjob] = useState([]);
    const [job_id, setjob_id] = useState();
    const location = useLocation()
    useEffect(() => {
      Post("getall", { tablename: "prisoner" }).then((data) => {
      data &&     setprisoner(data);
      });
      Post("getall", { tablename: "job" }).then((data) => {
      data &&     setjob(data);
      });
  
      
  
      Post('getbyid',{tablename:'job_assign',id:location.state.id}).then((data)=>{
          setprisoner_id(data.prisoner_id)
          setStartTime(data.stime)
          setEndTime(data.etime)
          setDate(data.date)
          setjob_id(data.job_id)
       })
    }, [refresh]);
    const save = () => {
      let param = {
        prisoner_id: prisoner_id,
        stime: stime,
        etime: etime,
        date: date,
        job_id:job_id,
        tablename: "job_assign",
        id:location.state.id
      };
      Post("update", param).then((data) => {
      if(data){
        toast.success("Update successfully!", {
          position: "top-right",
          autoClose: 3000,
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
                    type="time"
                    className="form-control"
                    value={stime}
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
                    value={etime}
                    placeholder="enter time" onChange={(e) => setEndTime(e.target.value)}
                  />
                  <label for="floatingPassword">Ending time</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="date"
                    value={date}
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
                    value={job_id}
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
  
                <button className="btn btn-primary" onClick={() => save()}>Update Assign Job</button>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default EditassJob;
