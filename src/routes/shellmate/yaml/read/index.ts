import { brewBlankExpressFunc, throwErrorResponse } from "code-alchemy";
import fs from "fs";
import path from "path";
import { tempDir } from "../../../../constants";
import yaml from "js-yaml";
import isAuth from "../../../../utils/is-auth";
import { log } from "starless-logger";

export default brewBlankExpressFunc(async (req, res) => {
  isAuth(req);
  const filePath = req.query.filepath || req.body.filepath;
  log(filePath);
  if (!filePath) {
    throwErrorResponse(400, "Missing filePath value");
  }

  const fileContent = fs.readFileSync(path.join(tempDir, filePath), "utf8");
  log(fileContent);
  const jsonContent = yaml.load(fileContent);

  log(JSON.stringify(jsonContent, null, 2));
  res.json(jsonContent);
});
