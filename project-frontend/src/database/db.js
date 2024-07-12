const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
require("dotenv").config();

// console.log(config);

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

module.exports = sequelize;