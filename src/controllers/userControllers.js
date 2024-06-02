import * as userServices from '../services/userServices.js';

//Đăng nhập
const UserLogin = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (Email && Password) {
      const response = await userServices.UserLogin({
        Email,
        Password,
        res,
      });
      return res.status(200).json(response);
    } else {
      return res.status(400).json({
        status: 400,
        message: 'Please enter complete information to continue',
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'An error occurred on the server',
    });
  }
};
// Đăng Ký
const UserRegister = async (req, res) => {
  try {
    // const { UserName, Password, FullName, Email, Avatar } = req.body;
    const { UserName, Password, FullName, Email } = req.body;

    if (UserName && Password && FullName && Email) {
      const response = await userServices.UserRegister({
        UserName,
        Password,
        FullName,
        Email,
      });
      return res.status(200).json(response);
    } else {
      return res.status(400).json({
        status: 400,
        message: 'Please enter complete information to continue',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: 'An error occurred on the server',
    });
  }
};

const ForgotPassword = async (req, res) => {
  try {
    const { Email } = req.body;
    if (Email) {
      const response = await userServices.ForgotPassword(Email);
      return res.status(200).json(response);
    } else {
      return res.status(404).json({
        status: 404,
        message: 'The user has not entered enough information to continue',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: 'An error occurred on the server',
    });
  }
};

const UserData = async (req, res) => {
  try {
    const response = await userServices.UserData();
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: 'An error occurred on the server',
    });
  }
};

const UserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const response = await userServices.UserById(id);
      return res.status(200).json(response);
    } else {
      return res.status(400).json({
        status: 400,
        message: 'Please enter complete information to continue',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: 'An error occurred on the server',
    });
  }
};

const hendleTest = async (req, res) => {
  try {
    const response = await userServices.hendleTest(req.body);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      err: err,
      message: 'ERR FROM SERVER',
    });
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
