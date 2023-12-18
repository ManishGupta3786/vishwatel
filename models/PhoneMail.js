module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    "PhoneMail",
    {
      CustUniqId: {
        type: Sequelize.STRING,
        length: 9,
      },
      Phone_Type: {
        type: Sequelize.STRING,
        length: 9,
      },
      Country_Code: {
        type: Sequelize.STRING,
        length: 5,
      },
      Phone_Number: {
        type: Sequelize.STRING,
        length: 20,
      },
      Email_id: {
        type: Sequelize.STRING,
        length: 50,
      },
      Fax: {
        type: Sequelize.STRING,
        length: 16,
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

  return Post;
};
