import { brewBlankExpressFunc } from "code-alchemy";
import jwt from "jsonwebtoken";
import isAuth from "../../../../utils/is-auth";
import getSequelize from "../../../../utils/get-sequelize";
import { log } from "starless-logger";

export default brewBlankExpressFunc(async (req, res) => {
  isAuth(req);
  const { session, sql } = req.body;
  log(req.body);
  const decoded = jwt.verify(session, process.env.JWT_SECRET);
  const sequelize = getSequelize(decoded);
  const result = await sequelize.query(sql);
  res.json(result);
});
