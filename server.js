import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from "cors";
import router from "./routes/index.js";
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(router);
const port = process.env.PORT || 1221;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
