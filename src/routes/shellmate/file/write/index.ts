import { brewBlankExpressFunc, throwErrorResponse } from "code-alchemy";
import isAuth from "../../../../utils/is-auth";
import { log } from "starless-logger";
import fs from "fs";
import path from "path";
import { tempDir } from "../../../../constants";

export default brewBlankExpressFunc(async (req, res) => {
  isAuth(req);
  const { data, filepath, mode } = req.body;
  log(req.body);
  if (!data || !filepath) {
    throwErrorResponse(400, "Missing data or filepath");
  }

  if (mode == "append") {
    fs.appendFileSync(path.join(tempDir, filepath), data, "utf8");
  } else {
    fs.writeFileSync(path.join(tempDir, filepath), data, "utf8");
  }

  res.json({ code: 200, message: "Write Successful" });
});
