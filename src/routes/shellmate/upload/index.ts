import { brewBlankExpressFunc } from "code-alchemy";
import fs from "fs";
import path from "path";
import { tempDir } from "../../../constants";
import { log } from "starless-logger";
import isAuth from "../../../utils/is-auth";

export default brewBlankExpressFunc(async (req, res) => {
  isAuth(req);
  const { file, filepath } = req.body;
  log(req.body);

  // Remove header of base64 file if present
  const base64File = file.split(";base64,").pop();

  fs.writeFile(
    path.join(tempDir, filepath),
    base64File,
    { encoding: "base64" },
    function (err) {
      if (err) {
        console.error(`Error writing file: ${err}`);
        return res.status(500).json({ code: 500, message: err.message });
      }
      return res.json({ code: 200, message: "File uploaded successfully" });
    }
  );
});
