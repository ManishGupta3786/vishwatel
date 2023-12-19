const db = require("../models");
// const { sequelize, DataTypes, fn, col } = require('sequelize');
const { Notification, CustIndDetails } = db;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;
const constant = require("./../config/constant");
const commonJSModule = require("../helper/common-function");
const MESSAGE = require("../utils/messages/response");
const { ResponseStatus } = constant;

// create and send notification to the customer
exports.createNotification = async (req, res) => {
    try {
        const { custUniqId, title, description } = req.body;
        let user_id = req.userInfo.id;
        let activeUser = await CustIndDetails.findOne({ where: { id: user_id }, raw: true });
        if (activeUser) {
            var notify = await Notification.create({ custUniqId, title, description });

            //implement notification sending functionality here...
            res.send({
                statusCode: ResponseStatus.Success,
                message: MESSAGE.NOTIFICATION_CREATED_SUCCESS,
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

// get all sent notification to the customer
exports.getAllNotification = async (req, res) => {
    try {
        let { custUniqId } = req.query;
        let user_id = req.userInfo.id;
        let activeUser = await CustIndDetails.findOne({ where: { id: user_id }, raw: true });
        if (!activeUser) {
            return res.json({
                statusCode: ResponseStatus.NotFound,
                message: MESSAGE.USER_NOT_EXIST,
            });
        } else {
            if (activeUser.user_type == "admin") {
                const result = await CustIndDetails.findAll({
                    attributes: [
                        ['id', 'user_id'],
                        'first_name',
                        'last_name',
                        [
                            Sequelize.literal(`CONCAT('[',
                          GROUP_CONCAT(
                            JSON_OBJECT(
                                'notification_id',notifications.id,
                              'title', notifications.title,
                              'description', notifications.description
                            )
                          )
                        , ']')`),
                            'notificationData',
                        ],
                    ],
                    include: [
                        {
                            model: Notification,
                            attributes: [],
                            where: { custUniqId: Sequelize.col('custinddetails.custUniqId') },
                        },
                    ],
                    group: ['custinddetails.id'],
                    raw: true,
                });
                res.json({
                    statusCode: ResponseStatus.Success,
                    message: MESSAGE.DATA_FETCHED_SUCCESSFULLY,
                    userData: result,
                });
            } else if (activeUser.user_type == "channel patner") {
                const result = await CustIndDetails.findAll({
                    attributes: [
                        ['id', 'user_id'],
                        'first_name',
                        'last_name',
                        [
                            Sequelize.literal(`CONCAT('[',
                          GROUP_CONCAT(
                            JSON_OBJECT(
                                'notification_id',notifications.id,
                              'title', notifications.title,
                              'description', notifications.description
                            )
                          )
                        , ']')`),
                            'notificationData',
                        ],
                    ],
                    include: [
                        {
                            model: Notification,
                            attributes: [],
                            where: { custUniqId: Sequelize.col('custinddetails.custUniqId') },
                        },
                    ],
                    where: { referral_by: activeUser.email },
                    group: ['custinddetails.id'],
                    raw: true,
                });
                res.json({
                    statusCode: ResponseStatus.Success,
                    message: MESSAGE.DATA_FETCHED_SUCCESSFULLY,
                    userData: result,
                });
            } else {
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

// update notification is read by customer or not
exports.updateNotification = async (req, res) => {
    try {
        let { isRead, notificationId=false } = req.body;
        let user_id = req.userInfo.id;
        let user = await CustIndDetails.findOne({ where: { id: user_id }, raw: true });
        if (!user) {
            return res.json({
                statusCode: ResponseStatus.NotFound,
                message: MESSAGE.USER_NOT_EXIST,
            });
        } else {
            let payload = { is_readed: isRead };
            let updatedData = await Notification.update(payload, {
                where: { id: notificationId },
            });
            res.send({
                statusCode: ResponseStatus.Success,
                message: MESSAGE.UPDATE_NOTIFICATION,
            });
        }
    } catch (err) {
        res.json({ statusCode: ResponseStatus.ERROR, message: err.message });
    }
};


// {
//     "user_id": 13,
//     "first_name":"manish",
//     "last_name":"gupta",
//     "posts":{
//         "title":"diwali",
//         "description":"wishing you a very happy diwali bro"
//     }
// }