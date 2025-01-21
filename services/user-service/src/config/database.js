const { Sequelize } = require('sequelize');

const POSTGRES_DB = process.env.POSTGRES_DB;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_HOST = process.env.POSTGRES_HOST;
const POSTGRES_PORT = process.env.POSTGRES_PORT;

// configura a conexão com o banco de dados
const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {    
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    dialect: 'postgres',
    logging: false,
});

module.exports = sequelize;