import * as servicesUser from "../services/hendleUser.js";

const getAllUser = async (req, res, next) => {
    try {
        let data = await servicesUser.getAllUser();
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessgse: "Error Server",
        });
    }
};

export { getAllUser };
