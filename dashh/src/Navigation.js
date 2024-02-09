import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./component/Home";

import ViewJail from "./component/jail/ViewJail";
import AddJail from "./component/jail/addjail";
import EditJail from "./component/jail/editjail";

import ViewDig from "./component/dig/ViewDig";
import AddDig from "./component/dig/adddig";
import EditDig from "./component/dig/editdig";

import ViewjailSup from "./component/jailSup/ViewjailSup";
import AddjailSup from "./component/jailSup/addjailsup";
import EditjailSup from "./component/jailSup/editjailsup";

import ViewPrisoners from "./component/Prisoners/ViewPrisoners";
import AddPrisoners from "./component/Prisoners/addprisoners";
import EditPrisoners from "./component/Prisoners/editprisoners";

import ViewJob from "./component/jobs/Viewjob";
import AddJob from "./component/jobs/addjob";
import EditJob from "./component/jobs/editjob";

import ViewassJob from "./component/assignJob/Viewassjob";
import AddassJob from "./component/assignJob/addassjob";
import EditassJob from "./component/assignJob/editassjob";

import ViewGrades from "./component/Grades/ViewGrades";
import AddGrades from "./component/Grades/addGrades";
import Editgrades from "./component/Grades/editgrades";

import ViewGatebook from "./component/Gatebook/ViewGatebook";
import AddGatebook from "./component/Gatebook/addGatebook";
import Editgatebook from "./component/Gatebook/editGatebook";

import ViewProcedures from "./component/Procedures/ViewProcedures";
import AddProcedures from "./component/Procedures/addProcedures";
import Editprocedures from "./component/Procedures/editProcedures";

import ViewDate from "./component/Attendance/ViewDate";
import ViewAttendance from "./component/Attendance/ViewAttendance";

import ViewRequest from "./component/Request/ViewRequest";
import AddRequest from "./component/Request/addrequest";
import Editrequest from "./component/Request/editrequest";

import Request from "./component/Viewrequest/Request";
import RequestView from "./component/Viewrequest/RequestView";

import Report from "./component/Report/Report";
import ViewReport from "./component/Report/ViewReport";

import Viewgd from "./component/generalduty/Viewgd";
import Addgd from "./component/generalduty/addgd";
import Editgd from "./component/generalduty/editgd";

import ViewMessage from "./component/Viewmessage/Viewmessage";
import SendMessage from "./component/Viewmessage/sendmessage";
import MessageView from "./component/Viewmessage/messageview";
import DGPRequest from "./component/Viewrequest/dgprequest";
import Messages from "./component/Viewmessage/messages";
import ReleasePrisoner from "./component/Prisoners/releaseprisoner";
import RemovedPrisoners from "./component/Prisoners/removedPrisoners";



export function AdminNavigation() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route path="/home" element={<Home />}></Route>

      <Route path="/viewjail" element={<ViewJail />}></Route>
      <Route path="/addjail" element={<AddJail />}></Route>
      <Route path="/editjail" element={<EditJail />}></Route>
      <Route path="/dgprequest" element={<DGPRequest />}></Route>
      <Route path="/messages" element={<Messages />}></Route>

      

      <Route path="/viewdig" element={<ViewDig />}></Route>
      <Route path="/adddig" element={<AddDig />}></Route>
      <Route path="/editdig" element={<EditDig />}></Route>

      <Route path="/viewjailsup" element={<ViewjailSup />}></Route>
      <Route path="/addjailsup" element={<AddjailSup />}></Route>
      <Route path="/editjailsup" element={<EditjailSup />}></Route>
      
      <Route path="/viewjob" element={<ViewJob />}></Route>
      <Route path="/addjob" element={<AddJob />}></Route>
      <Route path="/editjob" element={<EditJob />}></Route>

      <Route path="/viewgrades" element={<ViewGrades />}></Route>
      <Route path="/addgrades" element={<AddGrades />}></Route>
      <Route path="/editgrades" element={<Editgrades/>}></Route>

      
      <Route path="/viewrequest" element={<ViewRequest/>}></Route>
      <Route path="/addrequest" element={<AddRequest />}></Route>
      <Route path="/editrequest" element={<Editrequest/>}></Route>
      <Route path="/viewmessage" element={<ViewMessage/>}></Route>
      <Route path="/sendmessage" element={<SendMessage/>}></Route>
      <Route path="/messageview" element={<MessageView/>}></Route>


      <Route path="/request" element={<Request/>}></Route>
      <Route path="/requestview" element={<RequestView/>}></Route>

    </Routes>
  );
}

export function JailSuperindentNavigation() {
  return (
    <Routes>
      <Route path="/" element={<ViewPrisoners />}></Route>
      <Route path="/addprisoners" element={<AddPrisoners />}></Route>
      <Route path="/editprisoners" element={<EditPrisoners />}></Route>
      <Route path="/releaseprisoner" element={<ReleasePrisoner />}></Route>
      <Route path="/removedprisoner" element={<RemovedPrisoners />}></Route>
      
      


      <Route path="/viewassjob" element={<ViewassJob />}></Route>
      <Route path="/addassjob" element={<AddassJob />}></Route>
      <Route path="/editassjob" element={<EditassJob />}></Route>



      <Route path="/viewgatebook" element={<ViewGatebook />}></Route>
      <Route path="/addgatebook" element={<AddGatebook />}></Route>
      <Route path="/editgatebook" element={<Editgatebook/>}></Route>

      <Route path="/viewprocedures" element={<ViewProcedures />}></Route>
      <Route path="/addprocedures" element={<AddProcedures />}></Route>
      <Route path="/editprocedures" element={<Editprocedures/>}></Route>

      <Route path="/viewdate" element={<ViewDate/>}></Route>
      <Route path="/viewattendance" element={<ViewAttendance/>}></Route>

      <Route path="/viewrequest" element={<ViewRequest/>}></Route>
      <Route path="/addrequest" element={<AddRequest />}></Route>
      <Route path="/editrequest" element={<Editrequest/>}></Route>

      <Route path="/request" element={<Request/>}></Route>
      <Route path="/requestview" element={<RequestView/>}></Route>

      <Route path="/report" element={<Report/>}></Route>
      <Route path="/viewreport" element={<ViewReport/>}></Route>

      <Route path="/viewgd" element={<Viewgd/>}></Route>
      <Route path="/addgd" element={<Addgd />}></Route>
      <Route path="/editgd" element={<Editgd/>}></Route>

      <Route path="/viewmessage" element={<ViewMessage/>}></Route>
      <Route path="/sendmessage" element={<SendMessage/>}></Route>
      <Route path="/messageview" element={<MessageView/>}></Route>





    </Routes>
  );
}

export function GDNavigation() {
  return (
    <Routes>
      <Route path="/" element={<ViewGatebook />}></Route>
      <Route path="/addprisoners" element={<AddPrisoners />}></Route>
      <Route path="/editprisoners" element={<EditPrisoners />}></Route>


      <Route path="/viewassjob" element={<ViewassJob />}></Route>
      <Route path="/addassjob" element={<AddassJob />}></Route>
      <Route path="/editassjob" element={<EditassJob />}></Route>



      <Route path="/viewgatebook" element={<ViewGatebook />}></Route>
      <Route path="/addgatebook" element={<AddGatebook />}></Route>
      <Route path="/editgatebook" element={<Editgatebook/>}></Route>

      <Route path="/viewprocedures" element={<ViewProcedures />}></Route>
      <Route path="/addprocedures" element={<AddProcedures />}></Route>
      <Route path="/editprocedures" element={<Editprocedures/>}></Route>

      <Route path="/viewdate" element={<ViewDate/>}></Route>
      <Route path="/viewattendance" element={<ViewAttendance/>}></Route>

      <Route path="/viewrequest" element={<ViewRequest/>}></Route>
      <Route path="/addrequest" element={<AddRequest />}></Route>
      <Route path="/editrequest" element={<Editrequest/>}></Route>

      <Route path="/request" element={<Request/>}></Route>
      <Route path="/requestview" element={<RequestView/>}></Route>

      <Route path="/report" element={<Report/>}></Route>
      <Route path="/viewreport" element={<ViewReport/>}></Route>

      <Route path="/viewgd" element={<Viewgd/>}></Route>
      <Route path="/addgd" element={<Addgd />}></Route>
      <Route path="/editgd" element={<Editgd/>}></Route>

      <Route path="/viewmessage" element={<ViewMessage/>}></Route>
      <Route path="/sendmessage" element={<SendMessage/>}></Route>
      <Route path="/messageview" element={<MessageView/>}></Route>





    </Routes>
  );
}
export function DIGNavigation() {
  return (
    <Routes>
      

      <Route path="/" element={<ViewJob />}></Route>
      <Route path="/viewjob" element={<ViewJob />}></Route>
      <Route path="/addjob" element={<AddJob />}></Route>
      <Route path="/editjob" element={<EditJob />}></Route>

     

      <Route path="/viewgrades" element={<ViewGrades />}></Route>
      <Route path="/addgrades" element={<AddGrades />}></Route>
      <Route path="/editgrades" element={<Editgrades/>}></Route>
 

      <Route path="/viewrequest" element={<ViewRequest/>}></Route>
      <Route path="/addrequest" element={<AddRequest />}></Route>
      <Route path="/editrequest" element={<Editrequest/>}></Route>

      <Route path="/request" element={<Request/>}></Route>
      <Route path="/requestview" element={<RequestView/>}></Route>

      <Route path="/report" element={<Report/>}></Route>
      <Route path="/viewreport" element={<ViewReport/>}></Route>
 
      <Route path="/viewmessage" element={<ViewMessage/>}></Route>
      <Route path="/sendmessage" element={<SendMessage/>}></Route>
      <Route path="/messageview" element={<MessageView/>}></Route>


      <Route path="/viewjailsup" element={<ViewjailSup />}></Route>
      <Route path="/addjailsup" element={<AddjailSup />}></Route>
      <Route path="/editjailsup" element={<EditjailSup />}></Route>


    </Routes>
  );
}
