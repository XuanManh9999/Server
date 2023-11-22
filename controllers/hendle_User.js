import * as servicesUser from "../services/hendleUser.js";

const getAllUser = async ({ body, query }, res, next) => {
    try {
        const data = await servicesUser.getAllUser();
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal Server Error",
        });
    }
};

export { getAllUser };
