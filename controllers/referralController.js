const db = require("../models");
const { sequelize, DataTypes, fn, col } = require('sequelize');
const { Notification, CustIndDetails, Referral } = db;
const Op = db.Sequelize.Op;
const constant = require("./../config/constant");
const commonJSModule = require("../helper/common-function");
const MESSAGE = require("../utils/messages/response");
const { ResponseStatus } = constant;

// create and send notification to the user
exports.createReferral = async (req, res) => {
    try {
        // const { custUniqId, title, description } = req.body;
        let user_id = req.userInfo.id;
        let user = await CustIndDetails.findOne({ where: { id: user_id }, raw: true });
        if (user) {
            let ref = await Referral.findOrCreate({ where: { custUniqId: user.id, email: user.email, is_created: true  }, raw: true });
            res.send({
                statusCode: ResponseStatus.Success,
                message: MESSAGE.REFERRAL_CREATED_SUCCESS,
                refferalUrl: `${constant.BASE_URL}/api/create-referral/referral_by=${user.email}`
            });

        } else {
            res.json({
                statusCode: ResponseStatus.InvalidData,
                message: MESSAGE.INVALID_TOKEN,
            });
        }
    } catch (e) {
        res.json({ statusCode: ResponseStatus.ERROR, message: e.message });
    }
};