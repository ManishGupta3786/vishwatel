// const jwt = require("jsonwebtoken");
// const ResponseStatus = require("../utils/response-status.js");
// const MESSAGE = require("../utils/messages/response.js");

// // function to authenticate user while using private routes
// // exports.isValidUser = (req, res, next) => {
// //   try {
// //     let token = req.header("Authorization");
// //     if (token) {
// //       const decodeToken = jwt.verify(token, process.env.JWT_SECRETE_KEY);
// //       req.userInfo = decodeToken;
// //       req.token = token;
// //       next();
// //     } else {
// //       res.json({
// //         statusCode: ResponseStatus.Unathorised,
// //         message: MESSAGE.INVALID_TOKEN,
// //       });
// //     }
// //   } catch (error) {
// //     console.log("error", error);
// //     res.json({
// //       statusCode: ResponseStatus.Unathorised,
// //       message: MESSAGE.INVALID_TOKEN,
// //     });
// //   }
// // };

// exports.isValidUser = function (req, res, next) {
//   try {
//     let token = req.header("Authorization");
//     if (token) {
//       const decodeToken = jwt.verify(token, process.env.JWT_SECRETE_KEY);
//       req.userInfo = decodeToken;
//       req.token = token;
//       next();
//     } else {
//       res.json({
//         statusCode: ResponseStatus.Unathorised,
//         message: MESSAGE.INVALID_TOKEN,
//       });
//     }
//   } catch (error) {
//     console.log("error", error);
//     res.json({
//       statusCode: ResponseStatus.Unathorised,
//       message: MESSAGE.INVALID_TOKEN,
//     });
//   }
// };

const jwt = require("jsonwebtoken");
const ResponseStatus = require("../utils/response-status.js");
const MESSAGE = require("../utils/messages/response.js");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.json({
      statusCode: ResponseStatus.Unathorised,
      message: MESSAGE.INVALID_TOKEN,
    });

  jwt.verify(token, "ABCDEFGHIJKLMNOPQRST", (err, user) => {
    if (err)
      return res.json({
        statusCode: ResponseStatus.Unathorised,
        message: MESSAGE.INVALID_TOKEN,
      });
    req.userInfo = user;
    next();
  });
};

module.exports = authenticateToken;
