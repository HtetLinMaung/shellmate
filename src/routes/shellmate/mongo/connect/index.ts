import { brewBlankExpressFunc } from "code-alchemy";
import jwt from "jsonwebtoken";
import isAuth from "../../../../utils/is-auth";
import getMongoClient from "../../../../utils/get-mongo-client";

export default brewBlankExpressFunc(async (req, res) => {
  isAuth(req);
  const client = getMongoClient(req.body);
  await client.connect();
  const token = jwt.sign(req.body, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({
    code: 200,
    message: "Connection established!",
    session: token,
  });
});
