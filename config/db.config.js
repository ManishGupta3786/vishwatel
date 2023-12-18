module.exports = {
  PORT: process.env.DB_PORT,
  HOST: process.env.HOST,
  USER: process.env.USER_NAME,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB_NAME,
  dialect: "mysql",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

