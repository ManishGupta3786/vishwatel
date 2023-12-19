const db = require("../models");
// const { sequelize, DataTypes, fn, col } = require('sequelize');
const { Notification, CustIndDetails, Referral } = db;

CustIndDetails.hasMany(Notification,{ foreignKey: 'custUniqId', sourceKey:'custUniqId' });

// FcShoppingCartsModel.hasMany(fcSubProductModel, { foreignKey: 'product_id', sourceKey: 'product_id' });