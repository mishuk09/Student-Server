const { MYSQL_DB_CONFIG } = require("../config/db.config");

const mysql = require("mysql2/promise");

const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
    const { HOST, USER, PORT, PASSWORD, DB } = MYSQL_DB_CONFIG;
    const connection = await mysql.createConnection({
        host: HOST,
        user: USER,
        password: PASSWORD,
    });


    await connection.query(`Create Database if not exists\`${DB}\`;`);
    const sequelize = new Sequelize(DB, USER, PASSWORD, {
        dialect: "mysql",
        host: HOST,
    });

    db.Student = require("../student/student.model")(sequelize);

    await sequelize.sync({ alter: true });

}