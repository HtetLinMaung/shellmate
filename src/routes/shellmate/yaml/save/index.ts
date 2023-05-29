import { brewBlankExpressFunc, throwErrorResponse } from "code-alchemy";
import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import { tempDir } from "../../../../constants";
import { log } from "starless-logger";
import isAuth from "../../../../utils/is-auth";

export default brewBlankExpressFunc(async (req, res) => {
  isAuth(req);
  const { data, filepath } = req.body;
  log(req.body);
  if (!data || !filepath) {
    throwErrorResponse(400, "Missing data or filepath");
  }

  const yamlContent = yaml.dump(data);
  log(yamlContent);
  fs.writeFileSync(path.join(tempDir, filepath), yamlContent, "utf8");

  res.json({
    code: 200,
    message: "YAML file created successfully",
  });
});
