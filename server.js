// Common
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from "cors";

import main from "./src/routes/index.js";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
console.log(process.env.CLIENT_URL);
app.use(
  cors({
    origin: process.env.CLIENT_URL, // allow to server to accept request from different origin
    methods: ["GET", "POST", "PUT", "DELETE"], // allow to server to accept request from different method
  })
);
main(app);

const port = process.env.PORT || 1221;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
