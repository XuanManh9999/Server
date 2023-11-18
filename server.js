import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from "cors";
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res) {
    res.setHeader("Content-Type", "text/plain");
    res.write("you posted:\n");
    res.end(JSON.stringify(req.body, null, 2));
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
const port = process.env.PORT || 1221;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
