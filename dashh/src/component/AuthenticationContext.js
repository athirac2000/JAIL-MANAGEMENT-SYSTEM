import React, { useState, createContext, useContext } from "react";
import { Post } from "../Service/Api";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthenticationContext = createContext();

const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState(false);
  const [user, setUser] = useState("");
  const [userid, setUserId] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    // localStorage.clear();
    let info = JSON.parse(localStorage.getItem("userdata"));
    if (info?.usertype == 0) {
      setUser("admin");
    } else if (info?.usertype == 1) {
      setUser("dig");
    } else if (info?.usertype == 2) {
      setUser("jailsup");
    } else if (info?.usertype == 3) {
      setUser("gd");
    } 
  }, []);

  const onLogin = (email, password) => {
    let param = {
      email: email,
      password: password,
    };  
    console.log(param)

    Post("login", param).then((data) => {
    
      if (data == "invalid") {
        toast.error("Invalid User!");
        return false;
      }

      localStorage.setItem("userdata", JSON.stringify(data));
      setUserId(data?.loginid);
      if (data.usertype == 0) {
        setUser("admin");
      } else if (data.usertype == 1) {
        setUser("dig");
      } else if (data.usertype == 2) {
        setUser("jailsup");
      } else if (data.usertype == 3) {
        setUser("gd");
      }
    });
    setisLoading(true);
  };

  const onLogout = () => {
    localStorage.clear();
    setUser(false);
    window.location.href = "/";
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: user,
        userid,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
