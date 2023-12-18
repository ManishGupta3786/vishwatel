module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    "DirectorDetails",
    {
      CustUniqId: {
        type: Sequelize.STRING,
        length: 9,
      },
      Tran_Ref_No: {
        type: Sequelize.STRING,
        length: 20,
      },
      Tran_Date: {
        type: Sequelize.DATE,
      },
      Payment_Mode: {
        type: Sequelize.STRING,
        length: 20,
      },
      Tran_remarks: {
        type: Sequelize.STRING,
        length: 50,
      },
      Dr_Acc_NO: {
        type: Sequelize.STRING,
        length: 20,
      },
      Cr_Acc_No: {
        type: Sequelize.STRING,
        length: 20,
      },
      CURRENCY: {
        type: Sequelize.ENUM("INR", "GBP", "USD", "EUR"), ///INR/GBP/USD/EUR
      },
      EXCH_RATE: {
        type: Sequelize.INTEGER,
      },
      Party_Acc_Name: {
        type: Sequelize.STRING,
        length: 200,
      },
      Party_Address: {
        type: Sequelize.STRING,
        length: 200,
      },
      Party_Country: {
        type: Sequelize.STRING,
        length: 5,
      },
      Party_state: {
        type: Sequelize.STRING,
        length: 50,
      },
      Commission_Amt: {
        type: Sequelize.INTEGER,
      },
      Charges: {
        type: Sequelize.INTEGER,
      },
      Reversal_Txn_no: {
        type: Sequelize.STRING,
        length: 20,
      },
      Cheque_no: {
        type: Sequelize.STRING,
        length: 20,
      },
      Party_Bank_Name: {
        type: Sequelize.STRING,
        length: 200,
      },
      Party_Bank_State: {
        type: Sequelize.STRING,
        length: 20,
      },
      Party_Bank_Country: {
        type: Sequelize.STRING,
        length: 5,
      },
      Party_Bank_Address: {
        type: Sequelize.STRING,
        length: 50,
      },
      Party_Bank_BIC: {
        type: Sequelize.STRING,
        length: 50,
      },
      Response_Code: {
        type: Sequelize.STRING,
        length: 5,
      },
      Card_Details: {
        type: Sequelize.STRING,
        length: 50,
      },
      REMARKS_1: {
        type: Sequelize.STRING,
        length: 200,
      },
      FREE_TEXT1: {
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
