module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    "MiscDetails",
    {
      CustUniqId: {
        type: Sequelize.STRING,
        length: 9,
      },
      Doc_Id: {
        type: Sequelize.INTEGER,
      },
      Doc_scan_Id: {
        type: Sequelize.STRING,
        length: 20,
      },
      Doc_details: {
        type: Sequelize.STRING,
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
