const { MYSQL_DB_CONFIG } = require("../config/db.config");

const mysql = require("mysql2/promise");

const { Sequeilize } = require("sequelize");

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
    const sequelize = new Sequeilize(DB, USER, PASSWORD, {
        dialect: "mysql",
        host: host,
    });

    db.Student = require("../student/student.model")(sequelize);

    await sequelize.sync({ alter: true });

}