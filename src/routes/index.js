import routerUser from './RoutesUsers.js';
import routerToken from './RoutesToken.js';
import routerPoint from './RoutesPoint.js';
import routerAttendance from './RoutesAttendance.js';
function app(express) {
  express.use('/api/v1/user', routerUser);
  express.use('/api/v1/token', routerToken);
  express.use('/api/v1/point', routerPoint);
  express.use('/api/v1/attendance', routerAttendance);
}

export default app;
