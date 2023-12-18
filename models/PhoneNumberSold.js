module.exports = (sequelize, Sequelize) => {
    const PhoneNumberSold = sequelize.define(
        "PhoneNumberSold",
        {
            custUniqId: {
                type: Sequelize.STRING,
                length: 9,
            },
            phone_number: {
                type: Sequelize.STRING,
                length: 9,
            },
            country: {
                type: Sequelize.STRING,
                length: 50,
            },
            sub_scription: {
                type: Sequelize.STRING,
                length: 50,
            },
            payment_id: {
                type: Sequelize.STRING,
                length: 50,
            },
        },
        {
            cust_creation_date: "created_at",
            cust_updated_date: "updated_at",
        }
    );


    return PhoneNumberSold;
};
