import { Sequelize } from "sequelize";
import db from "../database/index.js";

const {DataTypes} = Sequelize;

const Posts = db.define('posts', {
    username: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    caption: DataTypes.STRING
}, {
    freezeTableName:true
})

export default Posts;

(async()=> {
    await db.sync();
})()