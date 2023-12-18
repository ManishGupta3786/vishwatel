module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    "LoginDetails",
    {
      CustUniqId: {
        type: Sequelize.STRING,
        length: 9,
      },
      Password: {
        type: Sequelize.STRING,
        length: 20,
      },
      Last_Login_time: {
        type: Sequelize.DATE,
      },
      Last_Login_IP: {
        type: Sequelize.STRING,
        length: 50,
      },
      Last_Logout_time: {
        type: Sequelize.DATE,
      },
      Password_reset_Count: {
        type: Sequelize.INTEGER,
      },
      Last_Passwrd_Change_Date: {
        type: Sequelize.DATE,
        allowNulll: false,
      },
      Last_Unsucss_Time: {
        type: Sequelize.DATE,
        allowNulll: false,
      },
      Password_Valid_Days: {
        type: Sequelize.INTEGER,
      },
      Password_Expiry_date: {
        type: Sequelize.DATE,
        allowNulll: false,
      },
      Last_Passwrd_Changed_By: {
        type: Sequelize.STRING,
        length: 30,
      },
    },
    {
      Cust_creation_Date: "created_at",
      Cust_updated_Date: "updated_at",
    }
  );
  return Post;
};
