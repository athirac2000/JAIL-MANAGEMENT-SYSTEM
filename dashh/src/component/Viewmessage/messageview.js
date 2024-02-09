import Sidebar from '../Sidebar';
import Nav from '../Nav';
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation} from "react-router-dom";

import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Post } from "../../Service/Api";
function MessageView() {
    const [refresh, setRefresh] = useState(0);
    const navigate = useNavigate();
    const [message, setmessage] = useState();
    const [subject, setsubject] = useState();
    const location = useLocation()
    useEffect(() => {
        
        Post("getbyid", { tablename: "message", id: location.state.id }).then(
          (data) => {
            setmessage(data.message);
            setsubject(data.subject);
           
          }
        );
      }, [refresh]);
      const save = () => {
        let param = {
            subject: subject,
            message: message,
            tablename: "message",
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
            navigate("/viewmessage");
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
                            <h6 className="mb-4">Messages</h6>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" value={subject}
                                    placeholder="Enter the subject" onChange={(e) => setsubject(e.target.value)}/>
                                <label for="floatingInput">Subject</label>
                            </div>
                            
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" value={message}
                                    placeholder="Enter the message" onChange={(e) => setmessage(e.target.value)}/>
                                <label for="floatingInput">Message</label>
                            </div>
                            
                            
                            
                           <button className='btn btn-primary' onClick={()=>save()}>Update Message</button>
                            
                            
                            
                           
                        </div>
                    </div>


                </div>
            </div>
        </>



    );
}

export default MessageView;