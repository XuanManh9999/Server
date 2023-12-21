import * as userServices from "../services/userServices.js";

const getAllUser = async () => {
    try {
        const data = await userServices.getAllUser();
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: "Error from server",
        });
    }
};

const getUserById = async (req, res, next) => {
    try {
        const { userId } = req.params;
        if (userId) {
            const data = await userServices.getUserById(userId);
            return res.status(200).json(data);
        } else {
            return res.status(500).json({
                code: 400,
                message: "The user's userId field cannot be empty",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: "Error from server",
        });
    }
};
export { getAllUser, getUserById };
