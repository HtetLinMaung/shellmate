import fs from "fs";
import { tempDir } from "./constants";

export const afterMasterProcessStart = async () => {
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }
};
