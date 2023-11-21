import express from "express";
import * as controllers_user from "../controllers/hendle_User.js";
const router = express.Router();
function API(router) {
    router.get("/api/getAllUser", controllers_user.getAllUser);
    router.get("/", (req, res, next) => {
        return res.status(200).json("hello world");
    });
}
API(router);
export default router;
