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
                defaultValue: false
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: true,
            },

        },
        {
            tableName: 'notifications',
            cust_creation_date: "created_at",
            cust_updated_date: "updated_at",
        }
    );


    return Notification;
};
