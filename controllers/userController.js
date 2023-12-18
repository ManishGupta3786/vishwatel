const db = require("../models2/index32323");
var path = require("path");
const User = db.users;
const Settings = db.visibilty_settings;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
const config = require("../config/config");
var passport = require("passport");
var bcrypt = require("bcryptjs");
var auth = require("./../config/auth");
var MESSAGE_EN = require("../config/mesages");
var MESSAGE_SP = require("../config/messageSP");
var dateFormat = require("dateformat");
var otpGenerator = require("otp-generator");
var validator = require("email-validator");
var constant = require("./../config/constant");
const EmailTemplate = require("email-templates").EmailTemplate;
const fs = require("fs");
var Sequelize = require("sequelize");
const ThumbnailGenerator = require("video-thumbnail-generator").default;
const ffprobe = require("@ffprobe-installer/ffprobe");
const moment = require("moment");
var FCM = require("fcm-node");
const { Review } = require("./reviewController");
const { ResponseStatus } = constant;
const AdditionalInfo = db.additional_infos;
const Country = db.countries;
const States = db.states;
const Fav = db.favourites;
const Notification = db.notifications;
const Notify_Setting = db.notifications_settings;
const Relation = db.user_relation;
const BlockUser = db.block_users;

let getLanguage = async (loginId) => {
  let user = await User.findOne({ where: { id: loginId } });
  if (user) {
    return user.dataValues.lng;
  }
};

// username check
exports.username = async (req, res) => {
  var MESSAGE = req.body.lng === "es" ? MESSAGE_SP : MESSAGE_EN;
  try {
    if (
      req.body.username == undefined ||
      req.body.username == "undefined" ||
      req.body.username == ""
    ) {
      res.json({
        status: ResponseStatus.NoContent,
        message: MESSAGE.USERNAME_REQUIRED,
      });
    } else {
      let user = await User.findOne({
        where: {
          [Op.or]: [
            { username: req.body.username },
            { email: req.body.username },
          ],
        },
      });
      if (user) {
        res.json({
          status: ResponseStatus.Success,
          message: MESSAGE.USERNAME_EXIST,
        });
      } else {
        res.json({
          status: ResponseStatus.NotFound,
          message: MESSAGE.USERNAME_NOT_FOUND,
        });
      }
    }
  } catch (e) {
    res.json({ status: ResponseStatus.ERROR, message: e.message });
  }
};

exports.register = async (req, res) => {
  console.log("register", req.body);
  var salt = 10;
  var passwordHash;
  let account_type = req.body.account_type;
  var userData = {};
  var MESSAGE = req.body.lng === "es" ? MESSAGE_SP : MESSAGE_EN;
  try {
    if (
      req.body.email == undefined ||
      req.body.email == null ||
      req.body.email == ""
    ) {
      res.json({
        status: ResponseStatus.NoContent,
        message: MESSAGE.USERNAME_REQUIRED,
      });
    }
    console.log("register1", req.body);
    bcrypt.hash(req.body.password, salt, async (err, encrypted) => {
      passwordHash = encrypted;
      if (account_type == "personal") {
        userData = {
          email: req.body.email,
          username: req.body.username,
          password: passwordHash,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          dob: req.body.dob,
          zip_code: req.body.zip_code,
          gender: req.body.gender,
          reference: req.body.reference,
          account_type: account_type,
          lng: req.body.lng,
          device_type: req.body.device_type,
          device_token: req.body.device_token,
        };
        console.log("userData", userData);
      } else {
        userData = {
          email: req.body.email,
          username: req.body.username,
          password: passwordHash,
          zip_code: req.body.zip_code,
          account_type: account_type,
          lng: req.body.lng,
          type_of_business: req.body.type_of_business,
          page_name: req.body.page_name,
          device_type: req.body.device_type,
          device_token: req.body.device_token,
        };
      }
      let user = await User.findOne({
        where: {
          [Op.or]: [{ email: req.body.email }, { username: req.body.username }],
        },
      });
      console.log("usr", user);
      if (user) {
        if (
          user.email == req.body.email &&
          user.username == req.body.username
        ) {
          var msg = MESSAGE.USERNAME_EXIST;
        } else if (user.username == req.body.username) {
          msg = MESSAGE.USRNAME_EXIST;
        } else if (user.email == req.body.email) {
          msg = MESSAGE.EMAIL_EXIST;
        }
        res.json({ status: ResponseStatus.AlreadyExist, message: msg });
      } else {
        var response = await User.create(userData);
        var bio = await AdditionalInfo.create({ user_id: response.id });
        var settings = await Settings.create({ user_id: response.id });
        console.log("businesssssssssssssssss", settings);
        var notify = await Notify_Setting.create({ user_id: response.id });
        // console.log("resss", response, response.id, bio, notify)
        if (response.reference == "3") {
          let result = await User.update(
            { other_note: req.body.other_note },
            {
              where: { id: response.id },
            }
          );
          console.log("resultr", result);
        }
        console.log("response", response);
        if (response) {
          const url = new URL(
            req.protocol + "://" + req.get("host") + req.originalUrl
          );
          var otp = otpGenerator.generate(4, {
            digits: true,
            alphabets: false,
            upperCase: false,
            specialChars: false,
          });
          const now = new Date();
          console.log("now", now);
          const expiration_time = AddMinutesToDate(now, 10);
          console.log("expiration0", expiration_time);
          var message =
            "Hello, " + response.username + " <br/> Your OTP : " + otp;

          let c = send_email_tenzo(
            response.email,
            message,
            (subject = "Email Verification")
          );
          console.log("send mail", c);
          var updateResponse = await User.update(
            { email_token: otp, expiration_time: expiration_time },
            { where: { id: response.id } }
          );
          console.log("updateresponse", updateResponse);
          user = await User.findOne({ where: { id: response.id } });
          if (user) {
            res.json({
              status: ResponseStatus.Success,
              message: MESSAGE.VERIFY_NEEDED,
              user: user,
            });
          }
        } else {
          res.json({
            status: ResponseStatus.BadRequest,
            message: MESSAGE.SOMETHING_WAS_WRONG,
          });
        }
      }
    });
  } catch (e) {
    res.send({ success: ResponseStatus.ERROR, message: e.message });
  }
};

exports.socialResgister = async (req, res) => {
  console.log("rrrrrrrrrrreg", req.body);
  var MESSAGE = req.body.lng === "es" ? MESSAGE_SP : MESSAGE_EN;
  try {
    let account_type = req.body.account_type;
    let Email =
      req.body.email == "undefined" ||
      req.body.email == undefined ||
      req.body.email == null ||
      req.body.email == ""
        ? null
        : req.body.email;

    if (account_type == "personal") {
      userData = {
        type: "social",
        provider_id: req.body.provider_id,
        provider_type: req.body.provider_type,
        email: Email,
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dob: req.body.dob,
        zip_code: req.body.zip_code,
        gender: req.body.gender,
        reference: req.body.reference,
        account_type: req.body.account_type,
        email_verify: "1",
        lng: req.body.lng,
        device_type: req.body.device_type,
        device_token: req.body.device_token,
      };
    } else {
      userData = {
        type: "social",
        provider_id: req.body.provider_id,
        provider_type: req.body.provider_type,
        email: Email,
        username: req.body.username,
        account_type: req.body.account_type,
        type_of_business: req.body.type_of_business,
        page_name: req.body.page_name,
        email_verify: "1",
        lng: req.body.lng,
        device_type: req.body.device_type,
        device_token: req.body.device_token,
      };
    }
    let user = await User.findOne({
      where: {
        [Op.or]: [
          { provider_id: req.body.provider_id },
          { username: req.body.username },
          { email: req.body.email },
        ],
      },
    });
    if (user) {
      if (
        user.provider_id == req.body.provider_id &&
        user.username == req.body.username &&
        user.email == req.body.email
      ) {
        var msg = MESSAGE.SOCIAL_ID_EXIST;
      } else if (user.username == req.body.username) {
        msg = MESSAGE.USRNAME_EXIST;
      } else if (user.provider_id == req.body.provider_id) {
        msg = MESSAGE.SOCIAL_ID_EXIST;
      } else if (user.email == req.body.email) {
        msg = MESSAGE.EMAIL_EXIST;
      }
      res.json({ status: ResponseStatus.AlreadyExist, message: msg });
    } else {
      var response = await User.create(userData);
      var bio = await AdditionalInfo.create({ user_id: response.id });
      var settings = await Settings.create({ user_id: response.id });
      var notify = await Notify_Setting.create({ user_id: response.id });
      console.log("resss", response, response.id, bio, notify);
      if (response.reference == "3") {
        let result = await User.update(
          { other_note: req.body.other_note },
          {
            where: { id: response.id },
          }
        );
        console.log("result", result);
      }
      user = await User.findOne({ where: { id: response.id } });
      console.log("user after ref", user);
      var token = jwt.sign(user.id, config.JWT_SECRETE_KEY);
      let updateData = {
        login_token: token,
      };

      let log_token = await User.update(updateData, { where: { id: user.id } });
      console.log(" login_token", log_token);

      user = await User.findOne({ where: { id: user.id } });
      console.log("user after login_token", user);

      if (user) {
        res.json({
          status: ResponseStatus.Success,
          message: MESSAGE.USER_REGISTER_SUCCESS,
          user: user,
        });
      } else {
        res.json({
          status: ResponseStatus.BadRequest,
          message: MESSAGE.SOMETHING_WAS_WRONG,
        });
      }
    }
  } catch (e) {
    res.json({ status: ResponseStatus.ERROR, message: e.message });
  }
};

//visibilty_settings
exports.updateVisibility = async (req, res) => {
  console.log("*****************", req.body);
  var MESSAGE = req.body.lng === "es" ? MESSAGE_SP : MESSAGE_EN;
  try {
    if (req.body.username == undefined || req.body.username == "") {
      res.json({
        status: ResponseStatus.NoContent,
        message: MESSAGE.USERNAME_REQUIRED,
      });
    } else {
      let user = await User.findOne({
        where: {
          [Op.or]: [
            { username: req.body.username },
            { email: req.body.username },
          ],
        },
      });
      if (user) {
        let user_setting = await Settings.findOne({
          where: { user_id: user.id },
        });
        let data = {
          user_id: user.id,
          email_visible: req.body.email_visible,
          firstname_visible: req.body.firstName_visible,
          lastname_visible: req.body.lastName_visible,
          zipCode_visible: req.body.zipCode_visible,
          dob_visible: req.body.dob_visible,
          age_visible: req.body.age_visible,
          profile_visible: req.body.profile_visible,
          show_imp: req.body.show_important_to_you,
          show_pronoun: req.body.show_pronoun,
          show_education: req.body.show_education,
          show_occupation: req.body.show_occupation,
          show_phoneno: req.body.show_phone_no,
          show_language: req.body.show_language,
          show_ethnicity: req.body.show_ethnicity,
          show_religion: req.body.show_religion,
          show_political_party: req.body.show_political_party,
          show_fav_sport: req.body.show_fav_sport,
          show_relatioship_status: req.body.show_relatioship_status,
          show_gender: req.body.show_gender,
          show_address: req.body.show_address,
          show_website: req.body.show_website,
          get_follower_show: req.body.get_follower_show,
        };
        if (user_setting) {
          await Settings.update(data, { where: { user_id: user.id } });
        } else {
          await Settings.create(data);
        }
        res.json({
          status: ResponseStatus.Success,
          message: MESSAGE.VISIBILITY_UPDATED,
        });
      } else {
        res.json({
          status: ResponseStatus.NotFound,
          message: MESSAGE.USERNAME_NOT_FOUND,
        });
      }
    }
  } catch (e) {
    res.json({ status: ResponseStatus.ERROR, message: e.message });
  }
};

//send-OTP
exports.sendVerfication = async (req, res) => {
  var MESSAGE = req.body.lng === "es" ? MESSAGE_SP : MESSAGE_EN;
  try {
    let user = await User.findOne({
      where: {
        [Op.or]: [
          { username: req.body.username },
          { email: req.body.username },
        ],
      },
    });
    if (user) {
      var OTP;
      const url = new URL(
        req.protocol + "://" + req.get("host") + req.originalUrl
      );
      var otp = otpGenerator.generate(4, {
        digits: true,
        alphabets: false,
        upperCase: false,
        specialChars: false,
      });
      var now = moment.utc(new Date()).format();
      var exp = user.expiration_time;
      let user_exp = moment.utc(exp).format();
      if (now <= user_exp) {
        OTP = user.email_token;
      } else {
        now = new Date();
        const expiration_time = AddMinutesToDate(now, 10);
        OTP = otp;
        var updateResponse = await User.update(
          { email_token: OTP, expiration_time: expiration_time },
          { where: { id: user.id } }
        );
        console.log("updateresponse", updateResponse);
      }
      console.log("OTP", OTP);
      var message = "Hello, " + user.username + " <br/> Your OTP : " + OTP;

      send_email_tenzo(user.email, message, (subject = "Email Verification"));

      res.json({
        status: ResponseStatus.Success,
        message: MESSAGE.VERIFY_EMAIL,
        otp: OTP,
      });
    } else {
      res.json({
        status: ResponseStatus.BadRequest,
        message: MESSAGE.SOMETHING_WAS_WRONG,
      });
    }
  } catch (e) {
    res.json({ status: ResponseStatus.ERROR, message: e.message });
  }
};

// Email verifications.
exports.verifyEmail = async (req, res) => {
  var MESSAGE = req.body.lng === "es" ? MESSAGE_SP : MESSAGE_EN;
  console.log("vvvvvvv", req.body);
  try {
    if (
      req.body.otp == undefined ||
      req.body.otp == "undefined" ||
      req.body.otp == ""
    ) {
      res.json({ status: ResponseStatus.NoContent, message: MESSAGE.OTP_REQ });
    } else {
      var otp = req.body.otp;
      var user = await User.findOne({ where: { email_token: otp } });
      if (user) {
        var now = moment.utc(new Date()).format();
        var exp = user.expiration_time;
        let expirationTime = moment.utc(exp).format();
        if (now <= expirationTime) {
          var response = await User.update(
            { email_verify: "", email_verify: "1" },
            { where: { id: user.id } }
          );
          if (response) {
            res.json({
              status: ResponseStatus.Success,
              message: MESSAGE.EMAIL_VERIFIED,
            });
          }
        } else {
          res.json({
            status: ResponseStatus.Forbidden,
            message: MESSAGE.OTP_EXPIRED,
          });
        }
      } else {
        res.json({
          status: ResponseStatus.InvalidData,
          message: MESSAGE.INVALID_OTP,
        });
      }
    }
  } catch (e) {
    res.json({ status: ResponseStatus.ERROR, message: e.message });
  }
};

//login

exports.login = async (req, res) => {
  console.log("req.body", req.body);
  var MESSAGE = req.body.lng === "es" ? MESSAGE_SP : MESSAGE_EN;
  try {
    let user = await User.findOne({
      where: {
        [Op.or]: [
          { username: req.body.username },
          { email: req.body.username },
        ],
      },
    });
    if (user) {
      await bcrypt.compare(
        req.body.password,
        user.password,
        async function (err, isMatch) {
          if (isMatch) {
            if (user.email_verify == 0) {
              console.log("useremail", user.email_verify);
              let usr = await User.findOne({
                where: { id: user.id },
                attributes: {
                  exclude: ["password"],
                },
              });
              res.json({
                status: ResponseStatus.Unathorised,
                message: MESSAGE.VERIFY_NEEDED,
                user: usr,
              });
            } else if (user.status == "inactive") {
              res.json({
                status: ResponseStatus.Forbidden,
                message: MESSAGE.DELETED_BY_ADMIN,
              });
            } else {
              var token = jwt.sign(user.dataValues.id, config.JWT_SECRETE_KEY);
              var obj = Object.assign({}, user.get());
              obj.login_token = token;
              console.log("token", token);
              let updateData = {
                login_token: token,
                lng: req.body.lng,
              };
              await User.update(updateData, { where: { id: user.id } });
              user = await User.findOne({
                where: { id: user.id },
                attributes: {
                  exclude: ["password"],
                },
              });
              console.log("user", user);
              res.json({
                status: ResponseStatus.Success,
                message: MESSAGE.LOGGED_IN_SUCCESS,
                user: user,
              });
            }
          } else {
            res.json({
              status: ResponseStatus.InvalidData,
              message: MESSAGE.INVALID_PASSWORD,
            });
          }
        }
      );
    } else {
      res.json({
        status: ResponseStatus.NotFound,
        message: MESSAGE.USER_NOT_EXIST,
      });
    }
  } catch (e) {
    res.json({ status: ResponseStatus.ERROR, message: e.message });
  }
};

exports.socialLogin = async function (req, res, next) {
  var MESSAGE = req.body.lng === "es" ? MESSAGE_SP : MESSAGE_EN;
  console.log("rrrrrrrrr", req.body);
  try {
    var user = await User.findOne({
      where: {
        provider_type: req.body.provider_type,
        provider_id: req.body.provider_id,
      },
    });

    if (user) {
      var token = jwt.sign(user.id, config.JWT_SECRETE_KEY);
      let updateData = {
        login_token: token,
        lng: req.body.lng,
      };
      await User.update(updateData, { where: { id: user.id } });
      user = await User.findOne({ where: { id: user.id } });
      res.json({
        status: ResponseStatus.Success,
        message: MESSAGE.YOU_HAVE_REGISTERED_WITH_SOCIAL,
        user: user,
      });
    } else {
      res.json({
        status: ResponseStatus.NotFound,
        message: MESSAGE.USER_NOT_EXIST,
      });
    }
  } catch (e) {
    res.json({ status: ResponseStatus.ERROR, message: e.message });
  }
};

// Forget Password.
exports.forgetPassword = async (req, res) => {
  var MESSAGE = req.body.lng === "es" ? MESSAGE_SP : MESSAGE_EN;
  try {
    if (
      req.body.email == null ||
      req.body.email == "undefined" ||
      req.body.email == ""
    ) {
      res.json({
        status: ResponseStatus.NoContent,
        message: MESSAGE.ENTER_REGISTERED_EMAIL,
      });
    } else {
      var email = req.body.email;
      if (validator.validate(email)) {
        var user = await User.findOne({ where: { email: email } });
        if (user) {
          var OTP;
          var otp = otpGenerator.generate(4, {
            digits: true,
            alphabets: false,
            upperCase: false,
            specialChars: false,
          });
          var exp = user.dataValues.expiry_time;
          var now;
          var expiry_time;
          if (exp == null) {
            now = new Date();
            expiry_time = AddMinutesToDate(now, 10);
            console.log("expiry_time", expiry_time);
            OTP = otp;
            var updateResponse = await User.update(
              { pass_reset_otp: OTP, expiry_time: expiry_time },
              { where: { id: user.id } }
            );
            console.log("updateresponse", updateResponse);
          } else {
            let user_exp = moment.utc(exp).format();
            now = moment.utc(new Date()).format();
            if (now <= user_exp) {
              OTP = user.pass_reset_otp;
            } else {
              now = new Date();
              expiry_time = AddMinutesToDate(now, 10);
              OTP = otp;
              var updateResponse = await User.update(
                { pass_reset_otp: OTP, expiry_time: expiry_time },
                { where: { id: user.id } }
              );
              console.log("updateresponse", updateResponse);
            }
            console.log("now", now, "exp", exp, "otp", otp);
          }
          var message = "Hello, " + user.username + " <br/> Your OTP : " + OTP;
          var url = new URL(
            req.protocol + "://" + req.get("host") + req.originalUrl
          );
          send_email_tenzo(
            user.email,
            message,
            (subject = "Email Verification")
          );

          res.json({
            status: ResponseStatus.Success,
            message: MESSAGE.OTP_SENT_SUCCESS_MESSAGE,
            otp: OTP,
          });
        } else {
          res.json({
            status: ResponseStatus.BadRequest,
            message: MESSAGE.USERNAME_NOT_FOUND,
          });
        }
      } else {
        res.json({
          status: ResponseStatus.ERInvalidDataROR,
          message: MESSAGE.ENTER_VALID_EMAIL,
        });
      }
    }
  } catch (e) {
    res.json({ status: ResponseStatus.ERROR, message: e.message });
  }
};

exports.verifyOTP = async (req, res) => {
  var MESSAGE = req.body.lng === "es" ? MESSAGE_SP : MESSAGE_EN;
  console.log("vvvvvvv", req.body);
  try {
    if (
      req.body.otp == undefined ||
      req.body.otp == "undefined" ||
      req.body.otp == ""
    ) {
      res.json({ status: ResponseStatus.NoContent, message: MESSAGE.OTP_REQ });
    } else {
      var otp = req.body.otp;
      var user = await User.findOne({ where: { pass_reset_otp: otp } });
      if (user) {
        var now = moment.utc(new Date()).format();
        var exp = user.expiry_time;
        let expirationTime = moment.utc(exp).format();
        console.log("now", now, "exp", exp, "expirationTime", expirationTime);
        if (now <= expirationTime) {
          var response = await User.update(
            { pass_reset_otp: null, expiry_time: null },
            { where: { id: user.id } }
          );
          if (response) {
            res.json({
              status: ResponseStatus.Success,
              message: MESSAGE.OTP_VERIFIED,
            });
          }
        } else {
          res.json({
            status: ResponseStatus.Forbidden,
            message: MESSAGE.OTP_EXPIRED,
          });
        }
      } else {
        res.json({
          status: ResponseStatus.InvalidData,
          message: MESSAGE.INVALID_OTP,
        });
      }
    }
  } catch (e) {
    res.json({ status: ResponseStatus.ERROR, message: e.message });
  }
};

// Reset Password.
exports.resetPassword = async (req, res) => {
  var MESSAGE = req.body.lng === "es" ? MESSAGE_SP : MESSAGE_EN;
  console.log("rrrsese", req.body);
  try {
    if (
      req.body.password == null ||
      req.body.password == "undefined" ||
      req.body.password == ""
    ) {
      res.json({ status: ResponseStatus.NoContent, message: MESSAGE.PASSWORD });
    } else if (req.body.password.length < 8) {
      res.json({
        status: ResponseStatus.LengthRequired,
        message: MESSAGE.PASSWORD_LENGTH,
      });
    } else {
      let user = await User.findOne({ where: { email: req.body.email } });
      console.log("user", user);
      bcrypt.hash(req.body.password, 10, async (err, encrypted) => {
        var updateResponse = await User.update(
          { pass_reset_otp: "", password: encrypted },
          { where: { id: user.id } }
        );
        if (updateResponse) {
          res.json({
            status: ResponseStatus.Success,
            message: MESSAGE.PASSWORD_UPDATE_SUCCESS,
          });
        }
      });
    }
  } catch (e) {
    res.json({ status: ResponseStatus.ERROR, message: e.message });
  }
};

//update lng
exports.lngUpdate = async (req, res) => {
  console.log("req.body", req.body);
  var MESSAGE = req.body.lng === "es" ? MESSAGE_SP : MESSAGE_EN;
  try {
    var token = req.headers["access-token"];
    if (
      req.headers["access-token"] == null ||
      req.headers["access-token"] == "undefined" ||
      req.headers["access-token"] == ""
    ) {
      res.json({
        status: ResponseStatus.NoContent,
        message: MESSAGE.TOKEN_REQUIRED,
      });
    } else {
      var user = await getUserIdByToken(token);
      console.log("user", user);
      if (user) {
        let lang = await User.update(
          { lng: req.body.lng },
          { where: { id: user } }
        );
        console.log("req.lang", lang);
        res.json({ status: ResponseStatus.Success, message: MESSAGE.LANGUAGE });
      } else {
        res.json({
          status: ResponseStatus.InvalidData,
          message: MESSAGE.INVALID_TOKEN,
        });
      }
    }
  } catch (e) {
    res.json({ status: ResponseStatus.ERROR, message: e.message });
  }
};

//update profile image
exports.updateProfileImage = async (req, res) => {
  console.log("req.body", req.files.image, "rrrrrrrrrrrrrrrrrrrrr:", req.body);
  try {
    var token = req.headers["access-token"];
    var loginId = await getLoginUserId(token);
    let lang = await getLanguage(loginId);
    var MESSAGE = lang === "es" ? MESSAGE_SP : MESSAGE_EN;
    if (!token) {
      res.json({
        status: ResponseStatus.NoContent,
        message: MESSAGE.TOKEN_REQUIRED,
      });
    } else {
      var user = await getUserIdByToken(token);
      if (user) {
        var userDetails = await User.findOne({ where: { id: user } });
        var NewName = dateFormat(new Date(), "yyyymmddHHMMss");
        var userPhoto = req.files.image;
        var fileExt = getExtension(req.files.image.name);
        filePath =
          "/uploads/users/profile/" + "user" + "-" + NewName + "." + fileExt;
        var response = await User.update(
          { profile: filePath },
          { where: { id: user } }
        );
        console.log("resssssssssssss", response);
        userPhoto.mv("public" + filePath, function (err) {
          if (err) {
            console.log(err);
          } else {
            if (userDetails.profile != "/uploads/users/profile/Photo.png") {
              if (fs.existsSync("public" + userDetails.profile)) {
                fs.unlinkSync("public" + userDetails.profile);
              }
            }

            res.json({
              status: ResponseStatus.Success,
              message: MESSAGE.IMAGE_UPDATED,
              filepath: filePath,
            });
          }
        });
      } else {
        res.json({
          status: ResponseStatus.InvalidData,
          message: MESSAGE.INVALID_TOKEN,
        });
      }
    }
  } catch (error) {
    res.json({ status: ResponseStatus.ERROR, message: error.message });
  }
};

//update profile
exports.updateProfile = async (req, res) => {
  try {
    var token = req.headers["access-token"];
    var loginId = await getLoginUserId(token);
    console.log("user1", loginId);
    let lang = await getLanguage(loginId);
    var MESSAGE = lang === "es" ? MESSAGE_SP : MESSAGE_EN;
    if (!token) {
      res.json({
        status: ResponseStatus.NoContent,
        message: MESSAGE.TOKEN_REQUIRED,
      });
    } else {
      var user = await User.findOne({ where: { id: loginId } });
      console.log("user2", user);
      if (user) {
        let dataUpdate = {
          email: req.body.email ? req.body.email : user.email,
          first_name: req.body.first_name
            ? req.body.first_name
            : user.first_name,
          last_name: req.body.last_name ? req.body.last_name : user.last_name,
          dob: req.body.dob ? req.body.dob : user.dob,
          zip_code: req.body.zip_code ? req.body.zip_code : user.zip_code,
          gender: req.body.gender ? req.body.gender : user.gender,
          type_of_business: req.body.type_of_business
            ? req.body.type_of_business
            : user.type_of_business,
          page_name: req.body.page_name ? req.body.page_name : user.page_name,
        };
        await User.update(dataUpdate, { where: { id: loginId } });
        user = await User.findOne({ where: { id: loginId } });
        res.json({
          status: ResponseStatus.Success,
          message: MESSAGE.PROFILE_UPDATED,
          user: user,
        });
      } else {
        res.json({
          status: ResponseStatus.InvalidData,
          message: MESSAGE.INVALID_TOKEN,
        });
      }
    }
  } catch (e) {
    res.json({ status: ResponseStatus.ERROR, message: e.message });
  }
};

//addtional info
exports.addInfo = async (req, res) => {
  console.log("req.body1234", req.body);
  try {
    var token = req.headers["access-token"];
    var loginId = await getLoginUserId(token);
    console.log("loginId", loginId);
    let lang = await getLanguage(loginId);
    var MESSAGE = lang === "es" ? MESSAGE_SP : MESSAGE_EN;
    if (!token) {
      res.json({
        status: ResponseStatus.NoContent,
        message: MESSAGE.TOKEN_REQUIRED,
      });
    } else {
      var user = await getUserIdByToken(token);
      if (user) {
        let dataBio = {
          most_imp_to_you: req.body.most_imp_to_you,
          pronouns: req.body.pronouns,
          phone_no: req.body.phone_no,
          education: req.body.education,
          education_name: req.body.education_name,
          occupation: req.body.occupation,
          languages: req.body.languages,
          ethnicity: req.body.ethnicity,
          religion: req.body.religion,
          political_party: req.body.political_party,
          fav_sport: req.body.fav_sport,
          relationship_status: req.body.relationship_status,
          description: req.body.description,
          website: req.body.website,
          street: req.body.street,
          city: req.body.city,
          state: req.body.state,
        };
        // console.log("BIO", dataBio)
        let bio = await AdditionalInfo.update(dataBio, {
          where: { user_id: loginId },
        });
        console.log("bio", bio);
        res.json({
          status: ResponseStatus.Success,
          message: MESSAGE.BIO_UPDATED,
        });
      } else {
        res.json({
          status: ResponseStatus.InvalidData,
          message: MESSAGE.INVALID_TOKEN,
        });
      }
    }
  } catch (e) {
    res.json({ status: ResponseStatus.ERROR, message: e.message });
  }
};

//get bio

exports.Bio = async (req, res) => {
  console.log("");
  try {
    var token = req.headers["access-token"];
    var loginId = await getLoginUserId(token);
    let lang = await getLanguage(loginId);
    var MESSAGE = lang === "es" ? MESSAGE_SP : MESSAGE_EN;
    if (!token) {
      res.json({
        status: ResponseStatus.NoContent,
        message: MESSAGE.TOKEN_REQUIRED,
      });
    } else {
      let user = await User.findOne({
        where: {
          id: req.query.user_id,
        },
        include: [
          {
            model: db.visibilty_settings,
          },
          {
            model: db.additional_infos,
          },
        ],
      });
      res.json({
        status: ResponseStatus.Success,
        message: MESSAGE.USER_DETAILS,
        user: user,
      });
    }
  } catch (e) {
    res.json({ status: ResponseStatus.ERROR, message: e.message });
  }
};

//country
exports.country = async (req, res) => {
  try {
    let country = await Country.findAll();
    res.json({ status: ResponseStatus.Success, Countries: country });
  } catch (e) {
    res.json({ status: ResponseStatus.ERROR, message: e.message });
  }
};
//states
exports.states = async (req, res) => {
  console.log("req.body", req.body);
  try {
    let states = await States.findAll({
      where: { phonecode: req.query.country_id },
    });
    res.json({ status: ResponseStatus.Success, States: states });
  } catch (e) {
    res.json({ status: ResponseStatus.ERROR, message: e.message });
  }
};

exports.updateCountryCode = async (req, res) => {
  try {
    var list = await Country.findAll();
    for (const row of list) {
      var obj = Object.assign({}, row.get());
      let status = await States.update(
        { phonecode: obj.phonecode },
        {
          where: {
            country_id: obj.id,
          },
        }
      );
    }
    // res.json({ status: ResponseStatus.Success, States: states });
  } catch (e) {
    res.json({ status: ResponseStatus.ERROR, message: e.message });
  }
};

//fav
exports.Fav = async (req, res) => {
  try {
    var token = req.headers["access-token"];
    var loginId = await getLoginUserId(token);
    let lang = await getLanguage(loginId);
    var MESSAGE = lang === "es" ? MESSAGE_SP : MESSAGE_EN;
    if (!token) {
      res.json({
        status: ResponseStatus.NoContent,
        message: MESSAGE.TOKEN_REQUIRED,
      });
    } else {
      let data = {
        user_id: loginId,
        business_id: req.body.business_id,
      };
      if (req.body.is_fav == "0") {
        let fav = await Fav.create(data);
        res.json({
          status: ResponseStatus.Success,
          message: MESSAGE.BUSSINESS_FAV,
          favourited: fav,
        });
      }
      if (req.body.is_fav == "1") {
        let fav = await Fav.destroy({
          where: {
            user_id: loginId,
            business_id: req.body.business_id,
          },
        });
        res.json({
          status: ResponseStatus.Success,
          message: MESSAGE.BUSSINESS_UNFAV,
        });
      }
    }
  } catch (e) {
    res.json({ status: ResponseStatus.ERROR, message: e.message });
  }
};

exports.favList = async (req, res) => {
  try {
    var token = req.headers["access-token"];
    var loginId = await getLoginUserId(token);
    let lang = await getLanguage(loginId);
    var MESSAGE = lang === "es" ? MESSAGE_SP : MESSAGE_EN;
    if (!token) {
      res.json({
        status: ResponseStatus.NoContent,
        message: MESSAGE.TOKEN_REQUIRED,
      });
    } else {
      let list = await Fav.findAll({ where: { user_id: loginId } });
      res.json({
        status: ResponseStatus.Success,
        message: MESSAGE.FAV_LIST,
        favouriteList: list,
      });
    }
  } catch (e) {
    res.json({ status: ResponseStatus.ERROR, message: e.message });
  }
};

//search

exports.searchUser = async (req, res) => {
  try {
    var token = req.headers["access-token"];
    var loginId = await getLoginUserId(token);
    let lang = await getLanguage(loginId);
    var MESSAGE = lang === "es" ? MESSAGE_SP : MESSAGE_EN;
    if (!token) {
      res.json({
        status: ResponseStatus.NoContent,
        message: MESSAGE.TOKEN_REQUIRED,
      });
    } else {
      var All = [];
      var user = [];
      var search = req.query.search;
      // console.log("search", loginId)
      let block = await BlockUser.findAll({
        where: {
          [Op.or]: [{ block_user: loginId }, { block_by: loginId }],
        },
      });
      console.log("lblblb", loginId, block);
      for (const row of block) {
        var obj = Object.assign({}, row.get());
        if (obj.block_user != loginId) {
          user.push(obj.block_user);
        } else {
          user.push(obj.block_by);
        }
      }
      var wherecondition = {
        [Op.or]: [
          { first_name: { [Op.like]: "%" + search + "%" } },
          { last_name: { [Op.like]: "%" + search + "%" } },
          { username: { [Op.like]: "%" + search + "%" } },
        ],
      };
      var list = await User.findAndCountAll({
        where: {
          [Op.and]: [{ [Op.not]: [{ id: user }] }, wherecondition],
        },

        attributes: ["id", "username", "first_name", "last_name", "profile"],
        include: [
          {
            model: db.additional_infos,
            attributes: ["street", "city", "state"],
          },
        ],
      });

      for (const row of list["rows"]) {
        var obj = Object.assign({}, row.get());
        console.log("user_id111", obj.id);
        obj.relation = await Following_User(obj.id, loginId);
        All.push(obj);
      }
      if (list) {
        list["rows"] = All;
      }
      res.json({
        status: ResponseStatus.Success,
        message: MESSAGE.SEARCH_LIST,
        users: list,
      });
    }
  } catch (e) {
    res.json({ status: ResponseStatus.ERROR, message: e.message });
  }
};

//block User---------------
exports.blockUser = async (req, res) => {
  try {
    var token = req.headers["access-token"];
    var loginId = await getLoginUserId(token);
    let lang = await getLanguage(loginId);
    var MESSAGE = lang === "es" ? MESSAGE_SP : MESSAGE_EN;
    if (!token) {
      res.json({
        status: ResponseStatus.NoContent,
        message: MESSAGE.TOKEN_REQUIRED,
      });
    } else {
      let block_status = req.body.block_status;
      let block;
      let relation = await Relation.findOne({
        where: {
          [Op.or]: [
            { sender_id: loginId, receiver_id: req.body.user_id },
            { sender_id: req.body.user_id, receiver_id: loginId },
          ],
        },
      });
      console.log("rrrrrrrrr", relation);
      let data;
      if (block_status == "0") {
        //block
        let User = await BlockUser.findOne({
          where: {
            block_user: req.body.user_id,
            block_by: loginId,
          },
        });
        if (User) {
          res.json({
            status: ResponseStatus.Success,
            message: MESSAGE.ALREADY_BLOCK_USER,
          });
        } else {
          block = await BlockUser.create({
            block_user: req.body.user_id,
            block_by: loginId,
            block_status: block_status,
          });
          data = {
            status: "inactive",
          };
          if (relation) {
            await Relation.update(data, {
              where: {
                [Op.or]: [
                  { receiver_id: loginId, sender_id: req.body.user_id },
                  { receiver_id: req.body.user_id, sender_id: loginId },
                ],
              },
            });
          }
          res.json({
            status: ResponseStatus.Success,
            message: MESSAGE.BLOCK_USER,
          });
        }
      } else {
        //unblock
        block = await BlockUser.destroy({
          where: {
            block_user: req.body.user_id,
            block_by: loginId,
          },
        });
        data = {
          status: "active",
        };
        if (relation) {
          await Relation.update(data, {
            where: {
              [Op.or]: [
                { receiver_id: loginId, sender_id: req.body.user_id },
                { receiver_id: req.body.user_id, sender_id: loginId },
              ],
            },
          });
        }
        res.json({
          status: ResponseStatus.Success,
          message: MESSAGE.UNBLOCK_USER,
        });
      }
    }
  } catch (e) {
    res.json({ status: ResponseStatus.ERROR, message: e.message });
  }
};

exports.blockprofile = async (req, res) => {
  try {
    var token = req.headers["access-token"];
    var loginId = await getLoginUserId(token);
    let lang = await getLanguage(loginId);
    var MESSAGE = lang === "es" ? MESSAGE_SP : MESSAGE_EN;
    if (!token) {
      res.json({
        status: ResponseStatus.NoContent,
        message: MESSAGE.TOKEN_REQUIRED,
      });
    } else {
      let list = await BlockUser.findAndCountAll({
        where: { block_by: loginId },
      });
      res.json({
        status: ResponseStatus.Success,
        message: MESSAGE.BLOCK_PROFILE,
        list: list,
      });
    }
  } catch (e) {
    res.json({ status: ResponseStatus.ERROR, message: e.message });
  }
};

// -----

exports.changePassword = async function (req, res, next) {
  try {
    var token = req.headers["access-token"];
    if (!token) {
      res.json({ success: false, message: "Token field is required." });
    } else {
      if (
        req.body.password == null ||
        req.body.password == "undefined" ||
        req.body.password == ""
      ) {
        res.json({ success: false, message: "Please enter current password." });
      } else if (
        req.body.new_password == null ||
        req.body.new_password == "undefined" ||
        req.body.new_password == ""
      ) {
        res.json({ success: false, message: "Please enter new password." });
      } else {
        var user = await User.findOne({ where: { login_token: token } });
        if (user) {
          await bcrypt.compare(
            req.body.password,
            user.password,
            function (err, isMatch) {
              if (err) console.log(err);
              if (isMatch) {
                var salt = 10;
                bcrypt.hash(req.body.new_password, salt, (err, encrypted) => {
                  var updateData = {
                    password: encrypted,
                  };
                  User.update(updateData, { where: { login_token: token } });
                  res.send({
                    success: ResponseStatus.Success,
                    message: "Password changed successfully.",
                  });
                });
              } else {
                res.send({
                  success: false,
                  message: "Current password has not match.",
                });
              }
            }
          );
        } else {
          res.status(200).send({
            success: false,
            message: "Invalid credential.",
          });
        }
      }
    }
  } catch (e) {
    res.send({ success: false, message: e.message });
  }
};

exports.logout = async function (req, res) {
  try {
    var token = req.headers["access-token"];
    var loginId = await getLoginUserId(token);
    let lang = await getLanguage(loginId);
    var MESSAGE = lang === "es" ? MESSAGE_SP : MESSAGE_EN;
    user = await User.findOne({ where: { login_token: token } });
    if (user) {
      let updateData = {
        login_token: "",
      };
      User.update(updateData, { where: { email: user.email } });
      res.send({ status: ResponseStatus.Success, message: MESSAGE.LOGOUT });
    } else {
      res.json({
        status: ResponseStatus.InvalidData,
        message: MESSAGE.INVALID_TOKEN,
      });
    }
  } catch (e) {
    res.send({ status: false, message: e.message });
  }
};

const getLoginUserId = async (token) => {
  let userObj = await User.findOne({ where: { login_token: token } });
  if (userObj) {
    return userObj.id;
  } else {
    return "Invalid Token";
  }
};

const getUserIdByToken = async (token) => {
  let userObj = await User.findOne({ where: { login_token: token } });
  if (userObj) {
    return userObj.id;
  } else {
    return false;
  }
};

const Following_User = async (userId, LoginId) => {
  // console.log("hjgjgjhjhj", userId, LoginId)
  let user = await Relation.findOne({
    where: {
      [Op.and]: [
        {
          [Op.or]: [{ receiver_id: LoginId }, { sender_id: LoginId }],
        },
        {
          [Op.or]: [{ receiver_id: userId }, { sender_id: userId }],
        },
      ],
    },
  });
  // console.log("hjgjgjhjhj", user, user.receiver_id, user.sender_id)
  if (user != null) {
    if (user.sender_id == userId && user.action_type == "1") {
      console.log("userrequested", user.sender_id, userId);
      return "requested";
    } else if (user.sender_id == userId && user.action_type == "2") {
      console.log("userfollower", user.sender_id, userId);
      return "follower";
    } else if (user.receiver_id == userId && user.action_type == "1") {
      console.log("userrequest", user.sender_id, userId);
      return "request sent";
    } else if (user.receiver_id == userId && user.action_type == "2") {
      console.log("userfollowing", user.sender_id, userId);
      return "following";
    }
  } else {
    return "follow";
  }
};

const getRelation = async (UserId, actionType, receiverId, senderId) => {
  if (parseInt(receiverId) === parseInt(UserId) && actionType == "2") {
    return 1; // follower
  } else if (parseInt(senderId) === parseInt(UserId) && actionType == "2") {
    return 2; //folllowing
  } else if (parseInt(receiverId) === parseInt(UserId) && actionType == "1") {
    return 3; //requested
  } else if (parseInt(senderId) === parseInt(UserId) && actionType == "1") {
    return 4; //request sent
  }
};

//Get file extention.
function getExtension(filename) {
  return filename.split(".").pop();
}

// *********  Send mail function **********//
function send_email_tenzo(email, message, subject) {
  const transporter = auth.transporter;
  var mailOptions = {
    from: constant.SENDER_EMAIL,
    to: email,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    console.log(error);
    if (error) {
      return false;
    } else {
      return true;
      console.log("Email sent: " + info.response);
    }
  });
}

function send_email(email, message, subject, userData, template) {
  const transporter = auth.transporter;
  var mailOptions = {
    from: constant.SENDER_EMAIL,
    to: email,
    subject: subject,
    html: "",
  };
  //   console.log("mailOptions", template)

  //     template.render(userData, function (err, result) {
  // 		// console.log("result",result)
  //     mailOptions.html = result.html;
  //     transporter.sendMail(mailOptions, function(error, info){
  //       if (error) {
  //         return false
  //       } else {
  //         return true;
  //       }
  //     });

  // });
}

function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

function sendFcm(message, type, user_id) {
  var serverKey =
    "AAAAjWfuU6c:APA91bHktUO-Nho_KQmFd3WYHxgAxUVpY0GL4NmcdbCmpYH7VQQi63kBJdEYu2zurf-Zkd4kVznUBjZFuytfwUIs_PdgPjrkGN6m8ALeNq7XcK4VdgJZ7lpeFQd_JopELVyOjvinRK4b";
  var fcm = new FCM(serverKey);
  fcm.send(message, function (err, response) {
    if (err) {
      console.log(err);
      console.log("Something has gone wrong!");
    } else {
      var responseData = JSON.parse(response);
      console.log("ressssssssssssss", responseData);
      if (responseData.success > 0) {
        var body = message.notification.body;
        var post_name = message.notification.post_name;
        var user_name = message.notification.name;
        console.log("post_name", post_name);
        InsertNotificationData(user_name, type, body, post_name, user_id);
        return true;
      } else {
        return false;
      }
    }
  });
}

// var token_id = req.user.id
//  var message = {
//             to: user.device_token,
//             collapse_key: 'your_collapse_key',
//             notification: {
//                 title: 'Watch Out! Stress level is going up',
//                 // body: 'Your order #'+orderId+' has placed successfully.'
//             },
//             data: {
//                 my_key: 'my value',
//                 my_another_key: 'my another value'
//             }
//         };
// sendFcm(message, token_id);

var InsertNotificationData = async (userName, Type, body, postName, userId) => {
  var notify = await Notification.create({
    user_name: userName,
    receiver_user_id: userId,
    type: Type,
    message: body,
    post_name: postName,
    date: moment.utc(new Date()).format("YYYY-MM-DD"),
    time: moment.utc(new Date()).format("H:mm:ss "),
  });
  console.log("nnnnn", notify);
  return notify;
};

// process.on('unhandledRejection', (reason, p) => {
// 	console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
// application specific logging, throwing an error, or other logic here
// });
