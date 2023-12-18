module.exports = (sequelize, Sequelize) => {
    const Referral = sequelize.define(
        "Referral",
        {
            custUniqId: {
                type: Sequelize.STRING,
                length: 9,
            },
            email: {
                type: Sequelize.STRING,
                length: 50,
                allowNull: false,
            },
            is_created: {
                type: Sequelize.BOOLEAN,
                length: 50,
                allowNull: false,
            }
        },
        {
            cust_creation_date: "created_at",
            cust_updated_date: "updated_at",
        }
    );


    return Referral;
};
