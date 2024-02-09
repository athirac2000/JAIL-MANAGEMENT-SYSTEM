import { useContext, useEffect, useState } from "react";
import { Post } from "../Service/Api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthenticationContext } from "./AuthenticationContext";
function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { onLogin } = useContext(AuthenticationContext);

  const isValidPassword = (password) => {
    return password.length < 8;
};

  const handleLogin = () => {
 
    onLogin(email, password);
  };


  return (
    <>
      <ToastContainer />
      <div className="fullbody">
       
      <div className="container-fluid" style={{marginLeft:"-365px"}}>
        <div
          className="row h-100 align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="col-6 col-sm-8 col-md-6 col-lg-5 col-xl-4" style={{marginTop:"-30px"}}>
            <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3" style={{height:"450px"}}>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h3 style={{color:"#d62828"}}> <i class="fa-solid fa-landmark-flag" style={{color:"#d62828"}}></i> Sign-In Now</h3>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="name@example.com"
                />
                <label for="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-4">
                <input
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label for="floatingPassword">Password</label>
              </div>

              <button
                onClick={(e) => {
                  handleLogin(email, password);
                }}
                className="btn py-3 w-100 mb-4 text-white" style={{backgroundColor:"#d62828"}}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
      
      
      </div>
    </>
  );
}

export default Login;
