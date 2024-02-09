import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminNavigation, DIGNavigation, GDNavigation, JailSuperindentNavigation } from "./Navigation";
import { AuthenticationContext } from "./component/AuthenticationContext";
import Login from "./component/Login";
import { useContext } from "react";

function App() {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <>
      <BrowserRouter>
        {isAuthenticated ? (
          isAuthenticated == "admin" ? (
            <AdminNavigation />
          ) : isAuthenticated == "jailsup" ? (
            <JailSuperindentNavigation />
          ) : isAuthenticated=="dig"?(
            <DIGNavigation/>
          ):isAuthenticated=='gd'?<GDNavigation/>:''
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
