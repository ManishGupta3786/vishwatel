const config = require("../config/config");
// const validationMiddleware = require("../middleware/validation-middleware");
const authenticateToken = require("../helper/isAuthenticate");


module.exports = (app) => {
    const referralController = require('../controllers/referralController.js');
    var router = require("express").Router();
    router.post("/create-referral", authenticateToken, referralController.createReferral);
    app.use("/api/", router);
};