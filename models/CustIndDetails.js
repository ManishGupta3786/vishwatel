module.exports = (sequelize, Sequelize) => {
  const CustIndDetails = sequelize.define(
    "CustIndDetails",
    {
      custUniqId: {
        type: Sequelize.STRING,
        length: 9,
      },
      referral_by:{
        type: Sequelize.STRING,
        length: 50,
        allowNull: true,
      },
      saluation: {
        type: Sequelize.STRING,
        length: 50,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        length: 50,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone_no: {
        type: Sequelize.STRING,
        length: 20,
        allowNull: true,
      },
      company_name: {
        type: Sequelize.STRING,
        length: 20,
        allowNull: true,
      },
      billing_name: {
        type: Sequelize.ENUM("Name", "Company", "Both"),
      },
      customer_type: {
        type: Sequelize.ENUM("Individual", "Business", "Organization"),
      },
      user_type: {
        type: Sequelize.ENUM("customer", "channel patner", "admin", "subadmin"),
      },
      first_name: {
        type: Sequelize.STRING,
        length: 50,
        allowNull: true,
      },
      middle_name: {
        type: Sequelize.STRING,
        length: 50,
        allowNull: true,
      },
      last_name: {
        type: Sequelize.STRING,
        length: 50,
        allowNull: true,
      },
      fathers_name: {
        type: Sequelize.STRING,
        length: 50,
        allowNull: true,
      },
      pan: {
        type: Sequelize.STRING,
        length: 10,
        allowNull: true,
      },
      aadhar_no: {
        type: Sequelize.STRING,
        length: 12,
        allowNull: true,
      },
      date_of_birth: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      gender: {
        type: Sequelize.ENUM("M", "F", "T"),
      },
      free_text1: {
        type: Sequelize.STRING,
        length: 30,
        allowNull: true,
      },
      free_text2: {
        type: Sequelize.STRING,
        length: 30,
        allowNull: true,
      },
      free_text3: {
        type: Sequelize.STRING,
        length: 30,
        allowNull: true,
      },
      free_text4: {
        type: Sequelize.STRING,
        length: 30,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        length: 50,
      },
      payoneer_id: {
        type: Sequelize.STRING,
        length: 50,
      },
      free_text5: {
        type: Sequelize.STRING,
        length: 30,
        allowNull: true,
      },
      free_text6: {
        type: Sequelize.STRING,
        length: 30,
        allowNull: true,
      },
      is_status: {
        type: Sequelize.ENUM("active", "inactive"),
        defaultValue: "active",
        allowNull: true,
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
  //   Post.associate = (models) => {
  //     Post.belongsTo(models.users, {
  //       foreignKey: "user_id",
  //     });
  //     Post.hasMany(models.post_likes, {
  //       foreignKey: "post_id",
  //     });

  //   };

  return CustIndDetails;
};
