import Sidebar from '../Sidebar';
import Nav from '../Nav';
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation} from "react-router-dom";

import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Post } from "../../Service/Api";
function Editprocedures() {
    const [refresh, setRefresh] = useState(0);
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [stime, setStime] = useState();
    const [etime, setEtime] = useState();
  const location = useLocation()

    useEffect(() => {
        
        Post("getbyid", { tablename: "tbl_procedures", id: location.state.id }).then(
          (data) => {
            setName(data.name);
            setDescription(data.description);
            setStime(data.stime);
            setEtime(data.etime);
          }
        );
      }, [refresh]);
      const save = () => {
        let param = {
            name: name,
            description: description,
            stime: stime,
            etime:etime,
            tablename: "tbl_procedures",
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
            navigate("/viewprocedures");
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
                            <h6 className="mb-4">Edit procedures</h6>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" value={name}
                                    placeholder="Enter The Name" onChange={(e)=>setName(e.target.value)}/>
                                <label for="floatingInput">Title</label>
                            </div>
                            
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" value={description}
                                    placeholder="Enter Description" onChange={(e)=>setDescription(e.target.value)}/>
                                <label for="floatingInput">Description</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="time" className="form-control" id="floatingInput" value={stime}
                                    placeholder="" onChange={(e)=>setStime(e.target.value)}/>
                                <label for="floatingInput">Starting Time</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="time" className="form-control" id="floatingInput" value={etime}
                                    placeholder="" onChange={(e)=>setEtime(e.target.value)}/>
                                <label for="floatingInput">Ending Time</label>
                            </div>
                            
                            
                           <button className='btn btn-primary' onClick={()=>save()}>Update</button>
                        </div>
                        </div>
                    </div>


                </div>
            
        </>



    );
}

export default Editprocedures;