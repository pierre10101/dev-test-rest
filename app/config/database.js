/**
 * Config file to set database environments for Sequelize
 */
require('dotenv').config()
module.exports = {
  "development": {
    "username": process.env.DEVELOPMENT_DATABASE_USERNAME,
    "password": process.env.DEVELOPMENT_DATABASE_PASSWORD,
    "database": process.env.DEVELOPMENT_DATABASE,
    "host": process.env.DEVELOPMENT_DATABASE_HOST,
    "port": process.env.DEVELOPMENT_DATABASE_PORT,
    "dialect": process.env.DEVELOPMENT_DATABASE_DRIVER 
  },
  "test": {
    "username": process.env.TEST_DATABASE_USERNAME,
    "password": process.env.TEST_DATABASE_PASSWORD,
    "database": process.env.TEST_DATABASE,
    "host": process.env.TEST_DATABASE_HOST,
    "port": process.env.TEST_DATABASE_PORT,
    "dialect": process.env.TEST_DATABASE_DRIVER 
  },
  "production": {
    "username": process.env.PRODUCTION_DATABASE,
    "password": process.env.PRODUCTION_DATABASE_USERNAME,
    "database": process.env.PRODUCTION_DATABASE_PASSWORD,
    "host": process.env.PRODUCTION_DATABASE_HOST,
    "port": process.env.PRODUCTION_DATABASE_PORT,
    "dialect": process.env.PRODUCTION_DATABASE_DRIVER 
  }
}
