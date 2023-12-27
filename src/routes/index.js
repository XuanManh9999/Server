import routerUser from "./RoutesUsers.js";
import routerToken from "./RoutesToken.js";
function app(express) {
    express.use("/api/v1/user", routerUser);
    express.use("/api/v1/token", routerToken);
}

export default app;
