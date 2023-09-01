import store from "../store";
import { addOutput, clearOutput } from "../store/output";

function clear(env, args) {
  let exitCode = 0;
  store.dispatch(clearOutput());
  env.exit(exitCode);
}

export default clear;
