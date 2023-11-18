import express from "express";
const router = express.Router();
function API(router) {
    router.get("/api", (req, res, next) => {
        return res.status(200).json({
          data: [
            "Xuân Mạnh"
          ]
        });
    });
    router.get('/', (req, res, next) => {
      return res.status(200).json('hello world');
    })
}
API(router);
export default router;
