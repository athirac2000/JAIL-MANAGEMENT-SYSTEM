import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { Link } from "react-router-dom";
import { Post } from "../../Service/Api";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ImgUrl } from "../../Service/Api";
function RemovedPrisoners() {
  const [prisoners, setprisoners] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    Post("getallremovedprisoners", { tablename: "prisoner" }).then((data) => {
      data && setprisoners(data);
    });
  }, [refresh]);
  return (
    <>
      <div class="container-fluid pt-4 px-4">
        <Sidebar />
        <div class="content">
          <Nav />

          <div class="container-fluid pt-4 px-4">
            <div class="row g-4">
              <div class="col-12">
                <div class="bg-light rounded h-100 p-4">
                  <h4>Released List</h4>
                  {prisoners.map((value) => {
                    return (
                      <div class="card" style={{ width: "18rem" }}>
                        <img src={ImgUrl+value.image} class="card-img-top" alt="..." />
                        <div class="card-body">
                          <h5 class="card-title">{value.name}</h5>
                          <p class="card-text">
                          Age:{value.age}<br></br>
                          Crime:{value.crime}<br></br>
                          Released:{value.edate}<br></br>
                          Remarks:{value.remarks}
                          </p>
                          
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RemovedPrisoners;
