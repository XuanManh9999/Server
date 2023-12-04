import express from "express";
import * as controllers_user from "../controllers/hendle_User.js";
const router = express.Router();
function configureRoutes(router) {
    router.get("/api/getAllUser", controllers_user.getAllUser);
    router.get("/api/getUserbyId", controllers_user.getUserById);
    router.get("/", (req, res, next) => {
        return res.status(200).json("Welcome to API EAUT");
    });
}
configureRoutes(router);
export default router;
