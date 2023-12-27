import * as tokenServices from "../services/tokenServices.js";

const UserRefreshToken = async (req, res) => {
    try {
        const { token } = req.headers;
        const refreshToken = token;
        if (refreshToken) {
            const responsive = await tokenServices.UserRefreshToken(
                refreshToken
            );
            return res.status(200).json(responsive);
        } else {
            return res.status(500).json({
                status: 500,
                message: "the refreshToken is not valid",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 500,
            message: "an eror in refreshToken",
        });
    }
};
export { UserRefreshToken };
