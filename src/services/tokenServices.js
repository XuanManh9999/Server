import jwt from 'jsonwebtoken';

const generateAcessToken = (data) => {
  const access_token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1m',
  });
  return access_token;
};

const UserRefreshToken = (refreshToken) => {
  return new Promise((resolve, _) => {
    try {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) {
            resolve({
              status: 404,
              message: 'The user is not authentication',
            });
          }
          if (user) {
            try {
              const newAcessToken = generateAcessToken({
                id: user.id,
                role: user.role,
              });
              if (newAcessToken) {
                resolve({
                  status: 200,
                  message: 'Created new token successfully',
                  access_token: newAcessToken,
                });
              } else {
                resolve({
                  status: 404,
                  message: 'Creating new token failed',
                });
              }
            } catch (err) {
              resolve({
                status: 404,
                message: 'The user is not authentication',
              });
            }
          } else {
            resolve({
              status: 404,
              message: 'The user is not authentication',
            });
          }
        }
      );
    } catch (err) {
      resolve({
        status: 404,
        message: 'refreshToken has expired, please log in again',
      });
    }
  });
};

export { UserRefreshToken };
