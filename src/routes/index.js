import routerUser from "./RoutesUsers.js";
import routerToken from "./RoutesToken.js";
import routerPoint from "./RoutesPoint.js";
import routerAttendance from "./RoutesAttendance.js";
import routerStudyprogram from "./RoutesStudyprogram.js";
import routerCommon from "./RoutesCommon.js";
import routerFaculty from "./RoutesFaculty.js";
import routerClass from "./RoutesClass.js";
import routerStudent from "./RoutesStudent.js";
import routerWarning from "./RoutesWarning.js";
import routerReport from "./RoutesReport.js";

function app(express) {
  express.use("/api/v1/user", routerUser);
  express.use("/api/v1/token", routerToken);
  express.use("/api/v1/point", routerPoint);
  express.use("/api/v1/attendance", routerAttendance);
  express.use("/api/v1/studyprogram", routerStudyprogram);
  express.use("/api/v1/common", routerCommon);
  express.use("/api/v1/faculty", routerFaculty);
  express.use("/api/v1/class", routerClass);
  express.use("/api/v1/student", routerStudent);
  express.use("/api/v1/warning", routerWarning);
  express.use("/api/v1/report", routerReport);
}
export default app;
