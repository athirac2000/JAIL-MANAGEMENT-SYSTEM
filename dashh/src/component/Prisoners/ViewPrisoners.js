import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ImgUrl, Post } from "../../Service/Api";
import { ToastContainer, toast } from "react-toastify";
function ViewPrisoners() {
  const [Prisoners, setPrisoners] = useState([]);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem('userdata'))
    let param = {
      tablename:'prisoner',
      jail_id:userdata.jailid
    }
    Post("getbydata", param).then((data) => {
      data &&   setPrisoners(data);
    });
  }, [refresh]);
  const deleteGrade = (id) => {
    Post("delete", { tablename: "prisoner", id: id }).then(
      (data) => {
    setRefresh((prev) => prev + 1);

        toast.error("Deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "custom-toast-success",
        });
      }
    );
  };
  return (
    <>
      <div class="container-fluid pt-4 px-4">
        <Sidebar />
        <ToastContainer/>
        <div class="content">
          <Nav />

          <div class="container-fluid pt-4 px-4">
            <div class="row g-4">
              <div class="col-12">
                <div class="bg-light rounded h-100 p-4">
                  <div className="row">
                    <div className="col-10">
                      <h6 class="mb-4">Prisoners Details</h6>
                    </div>
                    <div className="col-2">
                      <Link className="btn btn-primary" to="/addprisoners">
                        Add New
                      </Link>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          
                          <th scope="col">Prisoner Name</th>
                          <th scope="col">Location</th>
                          <th scope="col">Crime</th>
                          <th scope="col">Sentence start date</th>
                          <th scope="col">Sentence end date</th>
                          <th scope="col">Image</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {Prisoners.map((value)=>{
                            return(
                                <>
                                
                        <tr>
                          
                          <td>{value.name}</td>
                          <td>{value.location}</td>
                          <td>{value.crime}</td>
                          <td>{value.sdate}</td>
                          <td>{value.edate}</td>
                          <td><img src={ImgUrl+value.image} width={"80px"} height={"80px"}></img></td>
                          <td>
                            <Link
                              className="btn btn-success"
                              to="/editprisoners" state={{ id: value.id }}
                            >
                              Edit
                            </Link>
                            &nbsp;&nbsp;
                            <button className="btn btn-danger" onClick={() => deleteGrade(value.id)}>Delete</button>
                            &nbsp;&nbsp;
                            <Link
                              className="btn text-white" style={{backgroundColor:"#3f37c9"}}
                              to="/releaseprisoner" state={{ id: value.id }}
                            >
                             <i class="fa-brands fa-old-republic"></i> Release
                            </Link>
                          </td>
                        </tr>
                        </>
                            )
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewPrisoners;
