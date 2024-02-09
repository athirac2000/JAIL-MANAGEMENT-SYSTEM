import Sidebar from '../Sidebar';
import Nav from '../Nav';
import { Post } from "../../Service/Api";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function SendMessage() {
    const [refresh, setRefresh] = useState(0);
    const navigate = useNavigate();
    const [message, setmessage] = useState();
    const [subject, setsubject] = useState();
    const [authentcate, setauthentcate] = useState(JSON.parse(localStorage.getItem("userdata")));

    const save = () => {
        let param = {
            subject: subject,
            message: message,
            user_id:authentcate.loginid,
          tablename: "message",
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
                                <input type="text" className="form-control" id="floatingInput"
                                    placeholder="Enter the subject" onChange={(e) => setsubject(e.target.value)}/>
                                <label for="floatingInput">Subject</label>
                            </div>
                            
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput"
                                    placeholder="Enter the message" onChange={(e) => setmessage(e.target.value)}/>
                                <label for="floatingInput">Message</label>
                            </div>
                            
                            
                            
                           <button className='btn btn-primary' on onClick={()=>save()}>Send Message</button>
                        </div>
                    </div>


                </div>
            </div>
        </>



    );
}

export default SendMessage;