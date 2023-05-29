import { brewBlankExpressFunc } from "code-alchemy";
import jwt from "jsonwebtoken";
import getSequelize from "../../../../utils/get-sequelize";
import isAuth from "../../../../utils/is-auth";

export default brewBlankExpressFunc(async (req, res) => {
  isAuth(req);
  const sequelize = getSequelize(req.body);
  await sequelize.authenticate();
  const token = jwt.sign(req.body, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({
    code: 200,
    message: "Connection established!",
    session: token,
  });
});
