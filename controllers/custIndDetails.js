const db = require("../models");
const { sequelize, DataTypes, fn, col } = require('sequelize');
const { CustIndDetails } = db;
const Op = db.Sequelize.Op;
const constant = require("./../config/constant");
// import commonFunc from "../helper/common-function";
// import { encryptedValue, compareValue } from "../helper/common-function.js";
//import * as commonJSModule from "../helper/common-function.js";
const commonJSModule = require("../helper/common-function");
const MESSAGE = require("../utils/messages/response");
const { ResponseStatus } = constant;
const Jwt = require("jsonwebtoken");
const uuid = require('uuid');

// const randomUUID = uuid.v4();
// class CustIntDetailsController {
// Registration
exports.signup = async (req, res) => {
  try {
    const { referral_by } = req.query;
    let {
      firstName,
      lastName,
      dateOfBirth,
      company,
      country,
      billingName,
      password,
      email,
      phoneNo,
      customerType,
      userType,
    } = req.body;
    let exits = await CustIndDetails.findOne({
      where: {
        [Op.or]: [{ email: email }, { phone_no: phoneNo }],
      },
      raw:true
    });
    if (exits) {
      res.json({
        statusCode: ResponseStatus.AlreadyExist,
        message: MESSAGE.EMAIL_EXIST,
      });
    } else {
      let paload = {
        first_name: firstName,
        last_name: lastName,
        custUniqId: uuid.v4(),
        referral_by: referral_by ? referral_by : "",
        date_of_birth: dateOfBirth,
        country,
        phone_no: phoneNo,
        company_name: company,
        billing_name: billingName,
        customer_type: customerType,
        user_type: userType,
        email: email,
        password: await commonJSModule.encryptedValue(password),
        //await commonJSModule.encryptedValue(password)
      };
      const saveData = await CustIndDetails.create(paload);
      res.json({
        statusCode: ResponseStatus.Success,
        message: MESSAGE.USER_REGISTER_SUCCESS,
        data: saveData,
      });
    }
  } catch (e) {
    res.json({ statusCode: ResponseStatus.ERROR, message: e.message });
  }
};
// login
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await CustIndDetails.findOne({ where: { email: email }, raw:true });
    if (!user) {
      return res.json({
        statusCode: ResponseStatus.NotFound,
        message: MESSAGE.USER_NOT_EXIST,
      });
    }
    const comparePassword = await commonJSModule.compareValue(
      password,
      user.password
    );

    if (comparePassword) {
      let token = Jwt.sign({ id: user.id }, "ABCDEFGHIJKLMNOPQRST");
      let userData = await CustIndDetails.findOne({ where: { email: email }, raw:true });
      res.json({
        statusCode: ResponseStatus.Success,
        message: MESSAGE.LOGGED_IN_SUCCESS,
        userData: userData,
        token: token,
      });
    } else {
      res.json({
        statusCode: ResponseStatus.InvalidData,
        message: MESSAGE.INVALID_PASSWORD,
      });
    }
  } catch (err) {
    res.json({ statusCode: ResponseStatus.ERROR, message: err.message });
  }
};
// user change password
exports.changePassword = async (req, res) => {
  try {
    let { currentpassword, newpassword } = req.body;
    let user_id = req.userInfo.id;
    let user = await CustIndDetails.findOne({where:{ id: user_id }, raw:true});
    if (user) {
      const comparePassword = await commonJSModule.compareValue(
        currentpassword,
        user.password
      );
      if (comparePassword) {
        const hashedPassword = await commonJSModule.encryptedValue(newpassword);
        let updatedData = await CustIndDetails.update(
          { password: hashedPassword },
          {
            where: { id: user_id },
          }
        );
        res.send({
          statusCode: ResponseStatus.Success,
          message: MESSAGE.PASSWORD_CHANGE_SUCCESS,
        });
      } else {
        res.json({
          statusCode: ResponseStatus.InvalidData,
          message: MESSAGE.INVALID_PASSWORD,
        });
      }
    } else {
      res.json({
        statusCode: ResponseStatus.InvalidData,
        message: MESSAGE.INVALID_TOKEN,
      });
    }
  } catch (err) {
    res.json({ statusCode: ResponseStatus.ERROR, message: err.message });
  }
};
//Get UserDataById
exports.getUserDataById = async (req, res) => {
  try {
    let user_id = req.userInfo.id;
    let user = await CustIndDetails.findOne({ where: { id: user_id }, raw:true });
    if (!user) {
      return res.json({
        statusCode: ResponseStatus.NotFound,
        message: MESSAGE.USER_NOT_EXIST,
      });
    } else {
      res.json({
        statusCode: ResponseStatus.Success,
        message: MESSAGE.DATA_FETCHED_SUCCESSFULLY,
        userData: user,
      });
    }
  } catch (err) {
    res.json({ statusCode: ResponseStatus.ERROR, message: err.message });
  }
};
//Get UserDataById
exports.getAllUsersData = async (req, res) => {
  try {
    let user_id = req.userInfo.id;
    let activeUser = await CustIndDetails.findOne({ where: { id: user_id }, raw:true });
    if (!activeUser) {
      return res.json({
        statusCode: ResponseStatus.NotFound,
        message: MESSAGE.USER_NOT_EXIST,
      });
    } else {
      if (activeUser.user_type == "admin") {
        let users = await CustIndDetails.findAll();
        res.json({
          statusCode: ResponseStatus.Success,
          message: MESSAGE.DATA_FETCHED_SUCCESSFULLY,
          userData: users,
        });
      } else if (activeUser.user_type == "channel patner") {
        let users = await CustIndDetails.findAll({ where: { referral_by: activeUser?.email } });
        res.json({
          statusCode: ResponseStatus.Success,
          message: MESSAGE.DATA_FETCHED_SUCCESSFULLY,
          userData: users,
        });
      }else{
        res.json({
          statusCode: ResponseStatus.Forbidden,
          message: MESSAGE.FORBIDDEN,
        })
      }
    }
  } catch (err) {
    res.json({ statusCode: ResponseStatus.ERROR, message: err.message });
  }
};
//Get Dashboard Matrix
exports.getDashboardMatrix = async (req, res) => {
  try {
    let user_id = req.userInfo.id;
    let activeUser = await CustIndDetails.findOne({ where: { id: user_id }, raw:true });
    if (!activeUser) {
      return res.json({
        statusCode: ResponseStatus.NotFound,
        message: MESSAGE.USER_NOT_EXIST,
      });
    } else {
      if (activeUser.user_type == "admin") {
        const groupedData = await CustIndDetails.findAll({
          attributes: [
            [fn('YEAR', col('createdAt')), 'year'],
            [fn('MONTH', col('createdAt')), 'month'],
            [fn('COUNT', col('*')), 'totalRecords'],
          ],
          where: {
            user_type: 'customer',
          },
          group: [fn('YEAR', col('createdAt')), fn('MONTH', col('createdAt'))],
          order: [fn('YEAR', col('createdAt')), fn('MONTH', col('createdAt'))],
        });
        res.json({
          statusCode: ResponseStatus.Success,
          message: MESSAGE.DATA_FETCHED_SUCCESSFULLY,
          userData: groupedData,
        });
      } else if (activeUser.user_type == "channel patner") {
        const groupedData = await CustIndDetails.findAll({
          attributes: [
            [fn('YEAR', col('createdAt')), 'year'],
            [fn('MONTH', col('createdAt')), 'month'],
            [fn('COUNT', col('*')), 'totalRecords'],
          ],
          where: {
            user_type: 'customer',
            referral_by: 'manish@gmail.com',
          },
          group: [fn('YEAR', col('createdAt')), fn('MONTH', col('createdAt'))],
          order: [fn('YEAR', col('createdAt')), fn('MONTH', col('createdAt'))],
        });
        res.json({
          statusCode: ResponseStatus.Success,
          message: MESSAGE.DATA_FETCHED_SUCCESSFULLY,
          userData: groupedData,
        });
      }else{
        res.json({
          statusCode: ResponseStatus.Forbidden,
          message: MESSAGE.FORBIDDEN,
        })
      }
    }
  } catch (err) {
    res.json({ statusCode: ResponseStatus.ERROR, message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    let { firstName, lastName, phoneNo, dob, company, country, payoneerId, gender } = req.body;
    let user_id = req.userInfo.id;
    let user = await CustIndDetails.findOne({where:{ id: user_id}, raw:true });
    if (!user) {
      return res.json({
        statusCode: ResponseStatus.NotFound,
        message: MESSAGE.USER_NOT_EXIST,
      });
    } else {
      let payload = {
        first_name: firstName,
        last_name: lastName,
        phoneNo: phoneNo,
        gender: gender,
        date_of_birth: dob,
        payoneer_id: payoneerId,
        country: country,
        company_name: company
      };
      let updatedData = await CustIndDetails.update(payload, {
        where: { id: user_id },
      });
      res.send({
        statusCode: ResponseStatus.Success,
        message: MESSAGE.UPDATE_PROFILE,
      });
    }
  } catch (err) {
    res.json({ statusCode: ResponseStatus.ERROR, message: err.message });
  }
};

//}
////export default new CustIntDetailsController();
