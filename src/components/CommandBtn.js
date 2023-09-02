import React from "react";
import { useDispatch } from "react-redux";
import { setCommand } from "../store/command";

function CommandBtn({ command, children }) {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(setCommand(command));
  return (
    <span className="commandBtn" onClick={handleClick}>
      {children}
    </span>
  );
}

export default CommandBtn;
