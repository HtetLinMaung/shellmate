import { brewBlankExpressFunc } from "code-alchemy";
import path from "path";
import { tempDir } from "../../../../constants";
import { log } from "console";

export default brewBlankExpressFunc(async (req, res) => {
  const filePath = path.join(tempDir, req.params.dynamic + req.url);
  log(filePath);

  res.download(filePath);
});
