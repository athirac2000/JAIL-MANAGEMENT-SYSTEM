import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthenticationContext } from "./AuthenticationContext";

function Sidebar() {
  const { isAuthenticated } = useContext(AuthenticationContext);

  const userdata = JSON.parse(localStorage.getItem("userdata"));

  return (
    <div className="sidebar pe-4 pb-3">
      <nav className="navbar bg-light navbar-light">
        <a href="index.html" className="navbar-brand mx-4 mb-3">
          <h3 className="text-primary">
            <i className="fa fa-hashtag me-2"></i>Jail Management
          </h3>
        </a>
        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="position-relative">
            <img
              className="rounded-circle"
              src="img/user.jpg"
              alt=""
              style={{ width: "40px", height: "40px" }}
            />
            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
          </div>
          <div className="ms-3">
            {userdata.usertype == 0 ? (
              <>
                <h6 className="mb-0">Admin</h6>
                <span>Admin</span>
              </>
            ) : userdata.usertype == 1 ? (
              <>
                <h6 className="mb-0">{userdata.username} </h6>
                <span>DIG</span>
              </>
            ) : userdata.usertype == 2 ? (
              <>
                <h6 className="mb-0">{userdata.username} </h6>
                <span>Superintendent</span>
              </>
            ) : userdata.usertype == 3 ? (
              <>
                <h6 className="mb-0">{userdata.name} </h6>
                <span>GD</span>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="navbar-nav w-100">
          {isAuthenticated == "admin" ? (
            <>
              <NavLink
                activeclass="active"
                to="/home"
                className="nav-item nav-link"
              >
                <i className="fa fa-tachometer-alt me-2"></i>Dashboard
              </NavLink>
              <NavLink
                activeclass="active"
                to="/viewjail"
                className="nav-item nav-link"
              >
                <i class="fa-solid fa-handcuffs"></i>Jails
              </NavLink>
              <NavLink
                activeclass="active"
                to="/viewdig"
                className="nav-item nav-link"
              >
                <i class="fa-solid fa-user-secret"></i>DIG
              </NavLink>
              <NavLink
                activeclass="active"
                to="/viewjailSup"
                className="nav-item nav-link"
              >
                <i class="fa-solid fa-building-columns"></i>Jail Superintendent
              </NavLink>
              <NavLink
                activeclass="active"
                to="/viewgrades"
                className="nav-item nav-link"
              >
                <i class="fa-solid fa-graduation-cap"></i>Grades
              </NavLink>
              <NavLink
                activeclass="active"
                to="/viewjob"
                className="nav-item nav-link"
              >
                <i class="fa-solid fa-user-ninja"></i>Jobs
              </NavLink>
              <NavLink
                activeclass="active"
                to="/dgprequest"
                className="nav-item nav-link"
              >
                <i className="fa fa-tachometer-alt me-2"></i>View Request
              </NavLink>
              <NavLink
                activeclass="active"
                to="/messages"
                className="nav-item nav-link"
              >
                <i class="fa-regular fa-message"></i>View Messages
              </NavLink>
            </>
          ) : isAuthenticated == "jailsup" ? (
            <>
              <NavLink
                activeclass="active"
                to="/"
                className="nav-item nav-link"
              >
                <i class="fa-solid fa-handcuffs"></i>Prisoners
              </NavLink>
              <NavLink
                activeclass="active"
                to="/removedprisoner"
                className="nav-item nav-link"
              >
                <i class="fa-regular fa-registered"></i>Released Prisoners
              </NavLink>
              <NavLink
                activeclass="active"
                to="/viewassjob"
                className="nav-item nav-link"
              >
                <i class="fa-solid fa-users-line"></i>Job Assign
              </NavLink>
              <NavLink
                activeclass="active"
                to="/viewgd"
                className="nav-item nav-link"
              >
                <i class="fa-regular fa-clipboard"></i>General duty
              </NavLink>
              <NavLink
                activeclass="active"
                to="/viewrequest"
                className="nav-item nav-link"
              >
                <i class="fa-solid fa-pen-nib"></i>Request
              </NavLink>

              <NavLink
                activeclass="active"
                to="/viewprocedures"
                className="nav-item nav-link"
              >
                <i class="fa-solid fa-chalkboard-user"></i>Procedure
              </NavLink>

              <NavLink
                activeclass="active"
                to="/viewmessage"
                className="nav-item nav-link"
              >
                <i class="fa-regular fa-message"></i>Message
              </NavLink>

              <NavLink
                activeclass="active"
                to="/report"
                className="nav-item nav-link"
              >
                <i class="fa-solid fa-print"></i>Report
              </NavLink>
            </>
          ) : isAuthenticated == "dig" ? (
            <>
              <NavLink
                activeclass="active"
                to="/"
                className="nav-item nav-link"
              >
                <i class="fa-solid fa-handcuffs"></i>Jobs
              </NavLink>
              <NavLink
                activeclass="active"
                to="/request"
                className="nav-item nav-link"
              >
                <i className="fa fa-tachometer-alt me-2"></i>View Request
              </NavLink>
              <NavLink
                activeclass="active"
                to="/viewjailSup"
                className="nav-item nav-link"
              >
                <i class="fa-solid fa-building-columns"></i>Jail Superintendent
              </NavLink>
              <NavLink
                activeclass="active"
                to="/viewgrades"
                className="nav-item nav-link"
              >
                <i class="fa-solid fa-graduation-cap"></i>Grades
              </NavLink>
            </>
          ) : isAuthenticated == "gd" ? (
            <>
              <NavLink
                activeclass="active"
                to="/"
                className="nav-item nav-link"
              >
                <i class="fa-solid fa-dungeon"></i>Gatebook
              </NavLink>

              <NavLink
                activeclass="active"
                to="/viewdate"
                className="nav-item nav-link"
              >
                <i class="fa-solid fa-clipboard-user"></i>Attendance
              </NavLink>
            </>
          ) : (
            ""
          )}
        </div>
      </nav>
    </div>
  );
}
export default Sidebar;
