const express = require("express");
const config = require("../config/config");
const validationMiddleware = require("../middleware/validation-middleware");
const authenticateToken = require("../helper/isAuthenticate");
module.exports = (app) => {
  var router = require("express").Router();
  const customerIndDetails = require("../controllers/custIndDetails.js");
  router.post("/sign", customerIndDetails.login);
  router.post("/signup", customerIndDetails.signup);
  router.post("/change-password", authenticateToken, customerIndDetails.changePassword);
  router.post("/get-user-by-id", authenticateToken, customerIndDetails.getUserDataById);
  router.post("/get-all-user", authenticateToken, customerIndDetails.getAllUsersData);
  router.post("/update-profile", authenticateToken, customerIndDetails.updateProfile);
  router.post("/get-dashboard-matrix", authenticateToken, customerIndDetails.getDashboardMatrix);
  app.use("/api/", router);
};
