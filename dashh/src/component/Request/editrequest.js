import Sidebar from '../Sidebar';
import Nav from '../Nav';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Post } from "../../Service/Api";
function Editrequest() {
    const [title, settitle] = useState();
    const [description, setDescription] = useState();
    const [date, setdate] = useState();
  const [refresh, setRefresh] = useState(0);
  const location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    Post("getbyid", {
      tablename: "requests",
      id: location.state.id,
    }).then((data) => {
      data &&   settitle(data.title);
        setDescription(data.description);
        setdate(data.date);
      console.log(data);
    });
  }, [refresh]);

  const save = () => {
    let param = {
      title: title,
      description: description,
      date: date,
      id:location.state.id,
      requeststatus:'0',
      tablename: "requests",
    };
    Post("update", param).then((data) => {
      if(data){
        navigate("/viewrequest");
        setTimeout(() => { toast.success("Update successfully!", {
        position: "top-right",
        autoClose: 30000,
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

    return (


        <>
            <div className="container-fluid pt-4 px-4">

                <Sidebar />
                <ToastContainer/>
                <div className="content">

                    <Nav />

                    <div className="col-sm-12 col-xl-12">
                        <div className="bg-light rounded h-100 p-4">
                            <h6 className="mb-4">Edit request</h6>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput"
                                    placeholder="" onChange={(e) => settitle(e.target.value)} value={title}/>
                                <label for="floatingInput">Enter The Title</label>
                            </div>
                            
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput"
                                    placeholder="" onChange={(e) => setDescription(e.target.value)} value={description}/>
                                <label for="floatingInput">Enter The Description</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="date" className="form-control" id="floatingInput"
                                    placeholder="" onChange={(e) => setdate(e.target.value)} value={date}/>
                                <label for="floatingInput">Enter The Date</label>
                            </div>
                            
                            
                           <button className='btn btn-primary' onClick={() => save()}>Update</button>
                        </div>
                    </div>


                </div>
            </div>
        </>



    );
}

export default Editrequest;
