import React, { isValidElement } from "react";
import TermPrompt from "./TermPrompt";
/**
 * replace markdown links with react links and split the text
 * @param {string} line: line to check
 */
function parseLinksAndClasses(line) {
  // regex to match on markdown links
  const result = line.match(
    /(\(class=(.*)\)\(([^)]*)\)|\[([^[\]]*)\]\((.*?)\))/
  );
  if (result === null) {
    return line;
  }
  if (result[4] !== undefined) {
    const full = result[0];
    const text = result[4];
    const url = result[5];
    const [front, back] = line.split(full);

    // recurse to catch multiple links cause why not
    return (
      <>
        {front}
        <a href={url}>{text}</a>
        {parseLinksAndClasses(back)}
      </>
    );
  } else if (result[2] !== undefined) {
    const full = result[1];
    const spanClass = result[2];
    const text = result[3];
    const [front, back] = line.split(full);

    // recurse to catch multiple links cause why not
    return (
      <>
        {front}
        <span className={spanClass}>{parseLinksAndClasses(text)}</span>
        {parseLinksAndClasses(back)}
      </>
    );
  }
}

export function arrayToOutput(results) {
  return (
    <>
      {results.map((e, idx) => (
        <Results
          prompt={e.prompt === undefined ? <TermPrompt /> : e.prompt}
          command={e.command}
          result={e.result}
          key={idx}
        />
      ))}
    </>
  );
}

export default function Results({ prompt, command, result }) {
  return (
    <div>
      <div>
        {prompt} {command}
        <br />
      </div>
      {isValidElement(result)
        ? result
        : result === ""
        ? ""
        : result.split("\n").map((line, idx) => (
            <p key={idx} className="result-line">
              {parseLinksAndClasses(line)}
            </p>
          ))}
    </div>
  );
}
