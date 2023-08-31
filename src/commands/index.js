import bashEmulator from "bash-emulator";
import React from "react";

import echo from "./echo";

// the inital state of the env
const INIT_STATE = {
  history: [],
  user: "guest",
  workingDirectory: "/home/guest",
  fileSystem: {
    "/": {
      type: "dir",
      modified: Date.now(),
    },
    "/home": {
      type: "dir",
      modified: Date.now(),
    },
    "/home/guest": {
      type: "dir",
      modified: Date.now(),
    },
  },
};

/**
 * simple function to init the bash emulator
 * @returns bashEmulator instance
 */
function init() {
  const emu = bashEmulator(INIT_STATE);
  attachCommands(emu);

  return emu;
}
/**
 * attach custom commands to the emulator
 * @param {bashEmulator instance} emu
 */
function attachCommands(emu) {
  emu.commands.echo = echo;
}

// our emulator
const EMULATOR = init();
let historyIdx = 0;

/**
 *  Quick wrapper for running a command
 * @param {str} commandString command string
 * @returns output string
 */
export async function runCommand(commandString) {
  try {
    return await EMULATOR.run(commandString);
  } catch (error) {
    return <span className="red">{error}</span>;
  }
}

export async function historyMove(down = false) {
  let history = [...(await EMULATOR.getHistory())].reverse();
  if (down && historyIdx > -1) {
    historyIdx--;
  } else if (!down && historyIdx < history.length - 1) {
    historyIdx++;
  }

  if (historyIdx === -1 || history.length === 0) {
    return "";
  }

  return history[historyIdx];
}

export function setHistoryIdx(idx = -1) {
  historyIdx = idx;
}
