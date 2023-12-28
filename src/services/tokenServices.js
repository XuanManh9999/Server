import jwt from "jsonwebtoken";

const generateAcessToken = (data) => {
    const access_token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1m",
    });
    return access_token;
};

const UserRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err, user) => {
                    if (err) {
                        resolve({
                            status: 404,
                            message: "The user is not authentication",
                        });
                    }
                    if (user) {
                        const newAcessToken = generateAcessToken({
                            id: user.id,
                            role: user.role,
                        });
                        resolve({
                            status: "OK",
                            access_token: newAcessToken,
                        });
                    } else {
                        resolve({
                            status: 404,
                            message: "The user is not authentication",
                        });
                    }
                }
            );
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

export { UserRefreshToken };
