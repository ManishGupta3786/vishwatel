module.exports = (sequelize, Sequelize) => {
    const Notification = sequelize.define(
        "Notification",
        {
            custUniqId: {
                type: Sequelize.STRING,
                length: 9,
            },
            title: {
                type: Sequelize.STRING,
                length: 50,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                length: 50,
                allowNull: false,
            },
            is_readed: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            is_deleted: {
                type: Sequelize.ENUM("1", "0"),
                defaultValue: "1",
                allowNull: true,
              },

        },
        {
            cust_creation_date: "created_at",
            cust_updated_date: "updated_at",
        }
    );


    return Notification;
};
