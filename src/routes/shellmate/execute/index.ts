import { brewBlankExpressFunc, throwErrorResponse } from "code-alchemy";
import { exec } from "code-alchemy/child_process";
import { log } from "starless-logger";
import isAuth from "../../../utils/is-auth";

export default brewBlankExpressFunc(async (req, res) => {
  isAuth(req);
  // Getting the command and directory from the request body
  const command = req.body.command;
  const directory = req.body.directory;
  log(req.body);

  let result: any;
  if (directory) {
    result = await exec(command, {
      cwd: directory,
    });
  } else {
    result = await exec(command);
  }
  log(result);
  const { stdout, stderr } = result;

  res.json({
    stdout,
    stderr,
  });
});
