import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Validation = (param) => {
  console.log("param", param);

  for (const key in param) {
    if (!param[key]) {
      toast.error("All fields are required.");
      return false;
    }

    if (key === "contact" && param[key].toString().length != 10) {
      toast.error("Please Enter A Valid Contact");
      return false;
    }

    if (key === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(param[key])) {
        toast.error("Please Enter A Valid Email");
        return false;
      }
    }

    if (key === "password" && param[key].length < 8) {
      toast.error("Password Should Be at least 8 Characters");
      return false;
    }



  }

  return true;
};
