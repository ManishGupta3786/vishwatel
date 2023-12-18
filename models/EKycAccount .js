module.exports = (sequelize, Sequelize) => {
    const EKycAccount = sequelize.define(
        "EKycAccount",
        {
            custUniqId: {
                type: Sequelize.STRING,
                length: 9,
            },
            id_number: {
                type: Sequelize.STRING,
                length: 50,
                allowNull: false,
            },
            billing_address: {
                type: Sequelize.STRING,
                length: 50,
                allowNull: false,
            },
            proof_of_billing_Address: {
                type: Sequelize.STRING,
                length: 50,
                allowNull: false,
            },
            proof_of_id: {
                type: Sequelize.STRING,
                length: 50,
                allowNull: false,
            },

            status_id_number: {
                type: Sequelize.BOOLEAN, 
                allowNull: false,
            },
            status_billing_address: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            status_proof_of_billing_Address: {
                type: Sequelize.BOOLEAN, 
                allowNull: false,
            },
            status_proof_of_id: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },

        },
        {
            cust_creation_date: "created_at",
            cust_updated_date: "updated_at",
        }
    );


    return EKycAccount;
};
