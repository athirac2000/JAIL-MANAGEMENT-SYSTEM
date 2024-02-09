import Sidebar from '../Sidebar';
import Nav from '../Nav';
import { Post } from "../../Service/Api";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState } from 'react';
import { useEffect } from 'react';
function Editgrades() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [grades, setGrade] = useState([]);

    const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    Post("getall", { tablename: "grade" }).then((data) => {
      data &&   setGrade(data);
    });
    let param = {
      tablename: "grade",
      id: location.state.id,
    };
    Post("getbyid", param).then((data) => {
    setTitle(data.title);
    setDescription(data.description);
    
    });
  }, []);

  const save = () => {
    let param = {
      title: title,
      description: description,
      id: location.state.id,
      tablename: "grade",
    };
    Post("update", param).then((data) => {
      if(data){
        navigate("/viewgrades");
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
                            <h6 className="mb-4">Edit grades</h6>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput"
                                    placeholder="" value={title}
                                    onChange={(e) => setTitle(e.target.value)}/>
                                <label for="floatingInput">Title</label>
                            </div>
                            
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput"
                                    placeholder="" value={description}
                                    onChange={(e) => setDescription(e.target.value)}/>
                                <label for="floatingInput">Description</label>
                            </div>
                            
                            
                           <button className='btn btn-primary' onClick={()=>save()}>Update</button>
                        </div>
                    </div>


                </div>
            </div>
        </>



    );
}

export default Editgrades;
