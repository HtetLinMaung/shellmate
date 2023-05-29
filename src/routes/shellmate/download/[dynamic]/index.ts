import { brewBlankExpressFunc, throwErrorResponse } from "code-alchemy";
import fs from "fs";
import path from "path";
import { tempDir } from "../../../../constants";
import { log } from "console";

export default brewBlankExpressFunc(async (req, res) => {
  const filePath = path.join(tempDir, req.params.dynamic + req.url);
  log(filePath);

  res.download(filePath);
});
