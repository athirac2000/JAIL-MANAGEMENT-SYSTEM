import Sidebar from '../Sidebar';
import Nav from '../Nav';
import { Link } from 'react-router-dom';
import { Post } from "../../Service/Api";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer ,toast} from "react-toastify";

function ViewProcedures() {
    const [procedures, setprocedures] = useState([]);
    const [refresh, setRefresh] = useState(0);
    useEffect(() => {
      Post("getall", { tablename: "tbl_procedures" }).then((data) => {
      data &&   setprocedures(data);
      });
    }, [refresh]);
    const deleteprocedure = (id) => {
        Post("delete", { tablename: "tbl_procedures", id: id }).then(
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
                <div class="content">

                    <Nav />

                    <div class="container-fluid pt-4 px-4">
                        <div class="row g-4">

                            <div class="col-12">
                                <div class="bg-light rounded h-100 p-4">

                                    <div className='row'>
                                        <div className='col-10'>

                                            <h6 class="mb-4">Procedures</h6>
                                        </div>
                                        <div className='col-2'>

                                            <Link className='btn btn-primary' to='/addprocedures'>Add New </Link>
                                        </div>
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead>
                                                

                                                   
                                                <tr>
                                                    <th scope="col">Title</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Starting</th>
                                                    <th scope="col">Ending</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {procedures.map((value)=>{
                                                    return(
                                                <tr>
                                                    <td>{value.name}</td>
                                                    <td>{value.description}</td>
                                                    <td>{value.stime}</td>
                                                    <td>{value.etime}</td>
                                                    <td><Link className='btn btn-success' to='/editprocedures' state={{ id: value.id }}>Edit</Link>&nbsp;&nbsp;
                                                    <button className='btn btn-danger' onClick={() => deleteprocedure(value.id)}>Delete</button>
                                                    </td>
                                                </tr>
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

export default ViewProcedures;