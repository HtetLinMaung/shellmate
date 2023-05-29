import { brewBlankExpressFunc, throwErrorResponse } from "code-alchemy";
import fs from "fs";
import isAuth from "../../../../utils/is-auth";
import { log } from "starless-logger";
import { tempDir } from "../../../../constants";
import path from "path";

export default brewBlankExpressFunc(async (req, res) => {
  isAuth(req);
  const filePath = req.query.filepath || req.body.filepath;
  log(filePath);
  if (!filePath) {
    throwErrorResponse(400, "Missing filePath value");
  }

  const module = await import(path.join(tempDir, filePath));
  log(module.default);
  res.json(module.default);
});
