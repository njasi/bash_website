import welcomeMessage from "../config";

function welcome(env, args) {
  let exitCode = 0;
  env.output(welcomeMessage);
  env.exit(exitCode);
}

export default welcome
