import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { ImgUrl, Post, handlefileupload } from "../../Service/Api";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";

function ReleasePrisoner() {
  const [name, setName] = useState("");
  const [loc, setLocation] = useState("");
  const [crime, setCrime] = useState("");
  const [age, setAge] = useState("");
  const [authenticate, setauthenticate] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");

  const navigate = useNavigate();
  const [prisonorDetails, setprisonorDetails] = useState();
  const location = useLocation();
  const [prisonerName, setPrisonerName] = useState("");
  const [prisonercrime, setprisonercrime] = useState("");
  const [joinDate, setjoinDate] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [Remarks, setRemarks] = useState("");
  const [getIncome, setIncome] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const getTotalIncome = () => {
    let total = 0;
    getIncome.forEach((income) => {
      total += parseInt(income.charge);
    });
    return total;
  };

  useEffect(() => {
    let param = {
      tablename: "prisoner",
      id: location.state.id,
    };
    Post("getReleasedprisoner", param).then((data) => {
      data && setPrisonerName(data[0].name);
      setprisonercrime(data[0].crime);
      setjoinDate(data[0].sdate);
      setReleaseDate(data[0].edate);
    });

    let params = {
      tablename: "job_assign",
      id: location.state.id,
    };
    Post("getprisonerIncome", params).then((data) => {
      data && console.log(data);
      setIncome(data);
    });
    const getCurrentDate = () => {
      const date = new Date();
      const options = { year: "numeric", month: "long", day: "numeric" };
      const formattedDate = date.toLocaleDateString("en-US", options);
      setCurrentDate(formattedDate);
    };

    getCurrentDate();
  }, []);

  const save = () => {
    let param = {
     prisoner_id: location.state.id,
     remarks:Remarks,
    tablename: "releavingRemarks",
    };
    Post("saverelease", param).then((data) => {
      data && navigate("/");
      setTimeout(() => {
        toast.success("Remarks Added!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }, 500);
    });
  };

  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <Sidebar />
        <ToastContainer />

        <div className="content">
          <Nav />

          <div className="col-sm-12 col-xl-12">
            <div className="bg-light rounded h-100 p-4">
              <div className="certificate-container">
                <div className="cerificateheader">
                  <img
                    src="/img/jaillogo.png"
                    alt="Jail Logo"
                    className="certificatelogo"
                  />
                  <h1 class="h2">Jail Releasing Certificate</h1>
                </div>
                <div className="superintendent-info">
                  <div className="left-info">
                    <p>
                      <strong>Superintendent Name:</strong>
                      {authenticate.username}
                      <br />
                      <strong>Designation:</strong> Superintendent
                    </p>
                  </div>
                  <div className="right-info">
                    <p>
                      <strong>Contact:</strong> +{authenticate.contact}
                      <br />
                      <strong>Email:</strong> {authenticate.email}
                      <br />
                      <strong>Fax:</strong> +9876543210
                    </p>
                  </div>
                </div>

                <div className="relieving-letter-heading">
                  <h3 style={{ color: "#588157" }}>Relieving Letter</h3>
                </div>
                <div className="certificatecontent">
                  <p>
                    This is to certify that <strong>{prisonerName}</strong> was
                    imprisoned for the crime of <strong>{prisonercrime}</strong>
                    . They joined the prison on <strong>{joinDate}</strong> and
                    have now been officially released from prison on{" "}
                    <strong>{releaseDate}</strong>. We wish them the best for
                    their future endeavors.
                  </p>
                </div>
                <div className="certificatecontent">
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>Working Dates</th>
                          <th>Income</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getIncome.map((value) => {
                          return (
                            <>
                              <tr>
                                <td>{value.date}</td>
                                <td>{value.charge}/- ₹</td>
                              </tr>
                            </>
                          );
                        })}

                        <tr>
                          <td colSpan={2}>
                            <b
                              style={{ marginLeft: "580px", color: "#283618" }}
                            >
                              {" "}
                              Total Amount Earned: {getTotalIncome()}/- ₹
                            </b>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="right-info">
                    <div className="row">
                        <div className="col-10">
                  <h6 className="mt-4">Signature: </h6>
                  </div>
                  <div className="col-1">
                  <img
                    src="/img/sign.png"
                    alt="Jail Logo"
                    className="certificatelogo"
                  />
                  </div>
                  </div>
                  
                </div>

                <div className="left-info" style={{marginTop:"-90px"}}>
                <strong>Date:</strong> {currentDate}<br></br>
                  <img
                    src="/img/seal.png"
                    alt="Jail Logo"
                    className="certificatelogo"
                  />
                  </div>

                <div className="certificateform-group">
                  <label className="label">Remarks: </label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Your Remrks Here"
                    onChange={(e) => setRemarks(e.target.value)}
                    required
                  />
                </div>

                <button
                  className="btn button"
                  style={{ backgroundColor: "#588157" }}
                  onClick={() => save()}
                >
                  Approve Releasing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReleasePrisoner;
