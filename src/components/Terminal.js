import { useState, createRef } from "react";
import { historyMove, runCommand, setHistoryIdx } from "../commands";
import { arrayToOutput } from "./Results";
import TermPrompt from "./TermPrompt";
import { useDispatch, useSelector } from "react-redux";
import { setCommand } from "../store/command";

// generate a function to handle the command submitting
function generateFormHandler(add, updateCommand, setCursor) {
  return async (event) => {
    event.preventDefault();

    const command = event.target.termInput.value;
    updateCommand("");
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

function generateKeyDownHandler(updateCommand) {
  return async (e) => {
    let key = e.which ? e.which : e.keyCode;
    switch (key) {
      case 38:
        updateCommand(await historyMove());
        break;
      case 40:
        updateCommand(await historyMove(true));
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
  const [cursor, setCursor] = useState(0);
  const commandInput = createRef();
  const dispatch = useDispatch();
  const { command } = useSelector((state) => ({
    command: state.command.value,
  }));

  const updateCommand = (value) => dispatch(setCommand(value));

  const output = arrayToOutput(outputState);

  const handleBlur = () => commandInput.current.focus();
  const handleChange = (event) => {
    setCursor(event.target.selectionStart);
    updateCommand(event.target.value);
  };

  return (
    <main id="term-wrap">
      <header className="output">{output}</header>
      <form onSubmit={generateFormHandler(add, updateCommand, setCursor)}>
        <label htmlFor="term-input">
          <TermPrompt />
        </label>{" "}
        <input
          style={{ width: `${command.length + shift}ch` }}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={generateKeyDownHandler(updateCommand)}
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
