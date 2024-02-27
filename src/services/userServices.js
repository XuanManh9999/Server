import { pool as connection } from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
const generateAcessToken = (data) => {
  const access_token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });
  return access_token;
};

const generateRefreshToken = (data) => {
  const refresh_token = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "365d",
  });
  return refresh_token;
};

// đăng nhập
const UserLogin = ({ Email, Password, res }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Tìm
      const [results] = await connection.execute(
        "SELECT * FROM user WHERE Email = ?",
        [Email]
      );

      if (results.length === 0) {
        resolve({
          status: 404,
          message: "Email does not exist in the system",
        });
        return;
      }

      const IsCheckPassword = bcrypt.compareSync(Password, results[0].Password);

      if (IsCheckPassword) {
        const _idUser = results[0].ID;
        const [roleUser] = await connection.execute(
          "SELECT user.id, name FROM user INNER JOIN userinrole ON user.ID = userinrole.UserID INNER JOIN role ON userinrole.RoleID = role.ID AND user.ID = ?",
          [_idUser]
        );

        if (roleUser.length === 0) {
          resolve({
            status: 500,
            message:
              "There is an error on the server side. The error is in the database, which cannot find administrator permissions to authenticate",
          });
          return;
        }

        const access_token = generateAcessToken({
          id: roleUser[0].id,
          role: roleUser[0].name,
        });
        const refresh_token = generateRefreshToken({
          id: roleUser[0].id,
          role: roleUser[0].name,
        });

        // Cập nhật Refresh lưu vào DB
        await connection.execute(
          "UPDATE user SET RefreshToken = ? WHERE ID = ?",
          [refresh_token, roleUser[0].id]
        );

        // Lưu Refresh Token vào cookie
        res.cookie("refreshToken", refresh_token, {
          httpOnly: false,
          maxAge: 60 * 60 * 24 * 365 * 1000, // 365 ngày, đơn vị là miligiây
          path: "/",
          sameSite: "strict",
        });

        resolve({
          status: 200,
          message: "OK",
          UserName: results[0].UserName,
          FullName: results[0].FullName,
          Email: results[0].Email,
          Avatar: results[0].Avatar,
          access_token,
        });
      } else {
        resolve({
          status: 404,
          message: "The password does not match the email provided",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

// Quên mật khẩu
// Băm mật khẩu mới

const UserRegister = async ({
  UserName,
  Password,
  FullName,
  Email,
  Avatar,
}) => {
  let connect;
  try {
    connect = await connection.getConnection();
    if (!connect) {
      throw new Error("Connection is undefined or null.");
    }
    // Bắt đầu giao dịch
    await connect.beginTransaction();

    // Thực hiện truy vấn đầu tiên
    const salt = +process.env.SALT;
    const hashPassword = bcrypt.hashSync(Password, salt);
    const [userInsertResult] = await connect.execute(
      "INSERT INTO user (UserName, Password, FullName, Email, Avatar) VALUES (?, ?, ?, ?, ?)",
      [UserName, hashPassword, FullName, Email, Avatar]
    );

    // Thực hiện truy vấn thứ hai
    const [userInRoleResult] = await connect.execute(
      "INSERT INTO userinrole (UserID, RoleID) VALUES (?, ?)",
      [userInsertResult.insertId, 3]
    );

    // Commit giao dịch
    await connect.commit();

    // Trả về kết quả
    return {
      status: 200,
      message: "Đăng ký tài khoản thành công",
      data: userInRoleResult,
    };
  } catch (err) {
    // Nếu có lỗi, rollback để không lưu thay đổi vào cơ sở dữ liệu
    if (connect) {
      await connect.rollback();
    }

    // Nếu cần, xử lý lỗi hoặc throw lỗi để bắt ở nơi gọi hàm
    throw err;
  }
};

const generateRandomPassword = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  const password = Array.from(crypto.randomFillSync(new Uint32Array(length)))
    .map((value) => characters[value % characters.length])
    .join("");
  return password;
};

const ForgotPassword = async (Email) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM user WHERE email = ?",
      [Email]
    );

    if (results.length === 0) {
      return {
        status: 401,
        message: "No account exists in the system",
      };
    } else {
      return {
        status: 200,
        message: "OK",
        newPassword: generateRandomPassword(12),
      };
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const UserData = async () => {
  try {
    if (!connection) {
      throw new Error("Connection is undefined or null.");
    }

    const [results] = await connection.execute(
      "SELECT ID, UserName, FullName, Email, Avatar FROM user"
    );

    if (results.length === 0) {
      return {
        status: 401,
        message: "Data is empty",
        data: results,
      };
    } else {
      return {
        status: 200,
        message: "OK",
        data: results,
      };
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const UserById = async (id) => {
  try {
    if (!connection) {
      throw new Error("Connection is undefined or null.");
    }

    const [result] = await connection.execute(
      "SELECT ID, UserName, FullName, Email, Avatar FROM user WHERE ID = ?",
      [id]
    );

    if (result.length === 0) {
      return {
        status: 401,
        message: "The user does not exist in the system",
      };
    } else {
      return {
        status: 400,
        message: "OK",
        data: result,
      };
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const hendleTest = async (data) => {
  try {
    const { UserName, Password, fullName, Email, Avatar } = data;
    const res = await connection.execute(
      "insert into user (UserName, Password, FullName, Email, Avatar) VALUES (?, ?, ?, ?, ?)",
      [UserName, Password, fullName, Email, Avatar]
    );
    return {
      status: "OK",
      messege: "Thêm Thành Công",
    };
  } catch (err) {
    return {
      status: "ERR",
      messege: "Thêm Không Thành Công",
    };
  }
};
export {
  UserLogin,
  UserRegister,
  ForgotPassword,
  UserData,
  UserById,
  hendleTest,
};
