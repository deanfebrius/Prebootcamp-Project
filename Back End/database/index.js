import { Sequelize } from "sequelize";

const db = new Sequelize('db_scrolltime','root','jcwdvl07', {
  host:"localhost",
  port:3306,
  dialect:"mysql"
});


export default db;