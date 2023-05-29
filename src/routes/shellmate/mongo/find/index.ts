import { brewBlankExpressFunc } from "code-alchemy";
import jwt from "jsonwebtoken";
import isAuth from "../../../../utils/is-auth";
import getMongoClient from "../../../../utils/get-mongo-client";
import { log } from "starless-logger";

export default brewBlankExpressFunc(async (req, res) => {
  isAuth(req);
  const { session, collection_name, query } = req.body;
  log(req.body);
  const decoded: any = jwt.verify(session, process.env.JWT_SECRET);
  const { DATABASE } = decoded;
  const client = getMongoClient(decoded);
  await client.connect();
  const db = client.db(DATABASE);
  const collection = db.collection(collection_name);
  // Execute the query
  const result = await collection.find(query).toArray();

  // Send the query result as the response
  res.json(result);
});
