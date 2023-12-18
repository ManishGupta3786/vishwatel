module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    "Address",
    {
      CustUniqId: {
        type: Sequelize.STRING,
        length: 9,
      },
      Address_Type: {
        type: Sequelize.STRING,
        length: 10,
      },
      Address_Line1: {
        type: Sequelize.STRING,
        length: 50,
      },
      Address_Line2: {
        type: Sequelize.STRING,
        length: 50,
      },
      Address_Line3: {
        type: Sequelize.STRING,
        length: 50,
      },
      District: {
        type: Sequelize.STRING,
        length: 50,
      },
      State: {
        type: Sequelize.STRING,
        length: 50,
      },
      Country: {
        type: Sequelize.STRING,
        length: 50,
      },
      Pin: {
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
  return Post;
};
