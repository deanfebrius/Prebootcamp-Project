import { Sequelize } from "sequelize";
import db from "../database/index.js";

const { DataTypes } = Sequelize;

const Profiles = db.define(
  "profiles",
  {
    username: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    caption: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Profiles;

(async () => {
  await db.sync();
})();
