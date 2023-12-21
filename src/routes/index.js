import routerUser from "./RoutesUsers.js";
function app(express) {
    express.use("/api/v1/user", routerUser);
}

export default app;
