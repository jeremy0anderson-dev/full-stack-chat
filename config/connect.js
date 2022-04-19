const {Sequelize} = require('sequelize');
      require('dotenv').config();


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        dialect: "mysql",
        host: process.env.DB_HOST,
        port: 3306,
        logging: false
});

module.exports = sequelize;
    
    