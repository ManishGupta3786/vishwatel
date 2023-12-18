module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    "DirectorDetails",
    {
      CustUniqId: {
        type: Sequelize.STRING,
        length: 9,
      },
      Saluation: {
        type: Sequelize.STRING,
        length: 50,
      },
      First_Name: {
        type: Sequelize.STRING,
        length: 50,
      },
      Middle_Name: {
        type: Sequelize.STRING,
        length: 50,
      },
      Last_Name: {
        type: Sequelize.STRING,
        length: 50,
      },
      Fathers_Name: {
        type: Sequelize.STRING,
        length: 50,
      },
      Company_type: {
        type: Sequelize.ENUM("PVT", "LLP", "PROP"),
      },
      Designation: {
        type: Sequelize.STRING,
        length: 12,
      },
      Pan: {
        type: Sequelize.STRING,
        length: 10,
      },
      Aadhar_No: {
        type: Sequelize.STRING,
        length: 12,
      },
      Date_of_Birth: {
        type: Sequelize.DATEONLY,
      },
      Gender: {
        type: Sequelize.ENUM("M", "F", "T"),
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
