import { brewBlankExpressFunc, throwErrorResponse } from "code-alchemy";
import fs from "fs";
import isAuth from "../../../../utils/is-auth";
import { log } from "starless-logger";
import path from "path";
import { tempDir } from "../../../../constants";

export default brewBlankExpressFunc(async (req, res) => {
  isAuth(req);
  const { data, filepath } = req.body;
  log(req.body);
  if (!data || !filepath) {
    throwErrorResponse(400, "Missing data or filepath");
  }

  fs.writeFileSync(path.join(tempDir, filepath), JSON.stringify(data), "utf8");

  res.json({
    code: 200,
    message: "JSON file created successfully",
  });
});
