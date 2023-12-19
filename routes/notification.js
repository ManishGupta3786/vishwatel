// const express = require("express");
const config = require("../config/config");
// const validationMiddleware = require("../middleware/validation-middleware");
const authenticateToken = require("../helper/isAuthenticate");


module.exports = (app) => {
    const noticationController = require('../controllers/notificationController.js');
    var router = require("express").Router();
    router.post("/create-notification", authenticateToken, noticationController.createNotification);
    router.post("/get-all-notification", authenticateToken, noticationController.getAllNotification);
    router.post("/update-notification", authenticateToken, noticationController.updateNotification);
    app.use("/api/", router);
};