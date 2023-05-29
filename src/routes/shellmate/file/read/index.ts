import { brewBlankExpressFunc, throwErrorResponse } from "code-alchemy";
import isAuth from "../../../../utils/is-auth";
import { log } from "starless-logger";
import fs from "fs";
import path from "path";
import { tempDir } from "../../../../constants";

export default brewBlankExpressFunc(async (req, res) => {
  isAuth(req);
  const filePath = req.query.filepath || req.body.filepath;
  log(filePath);
  if (!filePath) {
    throwErrorResponse(400, "Missing filePath value");
  }

  const fileContent = fs.readFileSync(path.join(tempDir, filePath), "utf8");
  log(fileContent);

  res.json({ code: 200, message: "Read Successful", data: fileContent });
});
