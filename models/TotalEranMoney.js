module.exports = (sequelize, Sequelize) => {
    const TotalEranMoney = sequelize.define(
        "TotalEranMoney",
        {
            custUniqId: {
                type: Sequelize.STRING,
                length: 9,
            },
            total_earn: {
                type: Sequelize.FLOAT,
                length: 50,
                allowNull: false,
            },
            payment_info: {
                type: Sequelize.STRING,
                length: 9,
            },
        },
        {
            cust_creation_date: "created_at",
            cust_updated_date: "updated_at",
        }
    );


    return TotalEranMoney;
};
