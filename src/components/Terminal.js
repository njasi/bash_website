import { useState, createRef } from "react";
import { historyMove, runCommand, setHistoryIdx } from "../commands";
import { arrayToOutput } from "./Results";
import TermPrompt from "./TermPrompt";

// generate a function to handle the command submitting
function generateFormHandler(add, setCommand, setCursor) {
  return async (event) => {
    event.preventDefault();

    const command = event.target.termInput.value;
    setCommand("");
    setCursor(0);
    setHistoryIdx();

    const result = await runCommand(command);
    if (command === "clear") {
      // quick fix to prevent adding the command
      return;
    }

    let val = { command, result };
    add(val);
  };
}

function generateKeyDownHandler(setCommand) {
  return async (e) => {
    let key = e.which ? e.which : e.keyCode;
    switch (key) {
      case 38:
        setCommand(await historyMove());
        break;
      case 40:
        setCommand(await historyMove(true));
        break;
      default:
    }
  };
}

function generateKeyUpHandler(setCursor) {
  return async (e) => {
    let key = e.which ? e.which : e.keyCode;
    switch (key) {
      case 37:
      case 39:
        setCursor(e.target.selectionStart);
        break;
      default:
    }
  };
}

const shift = 10;

function Terminal({ outputState, add }) {
  const [command, setCommand] = useState("");
  const [cursor, setCursor] = useState(0);
  const commandInput = createRef();

  const output = arrayToOutput(outputState);

  const handleBlur = () => commandInput.current.focus();
  const handleChange = (event) => {
    setCursor(event.target.selectionStart);
    setCommand(event.target.value);
  };

  return (
    <main id="term-wrap">
      <header className="output">{output}</header>
      <form onSubmit={generateFormHandler(add, setCommand, setCursor)}>
        <label htmlFor="term-input">
          <TermPrompt />
        </label>{" "}
        <input
          style={{ width: `${command.length + shift}ch` }}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={generateKeyDownHandler(setCommand)}
          onKeyUp={generateKeyUpHandler(setCursor)}
          ref={commandInput}
          id="termInput"
          type="text"
          autoFocus
          autoComplete="off"
          autoCapitalize="off"
          value={command}
        ></input>
        <div
          className="cursor"
          style={{ left: `-${command.length - cursor + shift}ch` }}
        >
          █
        </div>
      </form>
    </main>
  );
}

export default Terminal;
