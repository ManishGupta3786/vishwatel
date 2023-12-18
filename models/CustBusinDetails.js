module.exports = (sequelize, Sequelize) => {
  const CustBusinDetails = sequelize.define(
    "CustBusinDetails",
    {
      CustUniqId: {
        type: Sequelize.STRING,
        length: 9,
      },
      CIN: {
        type: Sequelize.STRING,
        length: 20,
      },
      Identification_Doc_Num: {
        type: Sequelize.STRING,
        length: 50,
      },
      Date_of_Incorporation: {
        type: Sequelize.DATEONLY,
      },
      Free_Text1: {
        type: Sequelize.STRING,
        length: 30,
      },
      Free_Text2: {
        type: Sequelize.STRING,
        length: 30,
      },
      Free_Text3: {
        type: Sequelize.STRING,
        length: 30,
      },
      Free_Text4: {
        type: Sequelize.STRING,
        length: 30,
      },
      Free_Text5: {
        type: Sequelize.STRING,
        length: 30,
      },
      Free_Text6: {
        type: Sequelize.STRING,
        length: 30,
      },
      IsStatus: {
        type: Sequelize.ENUM("active", "inactive"),
        defaultValue: "active",
      },
      IsDeleted: {
        type: Sequelize.ENUM("1", "0"),
        defaultValue: "1",
      },
    },
    {
      Cust_creation_Date: "created_at",
      Cust_updated_Date: "updated_at",
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

  return CustBusinDetails;
};
