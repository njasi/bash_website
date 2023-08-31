import React from "react";

export default function TermPrompt({ user = "guest", host = "njasi.com" }) {
  return (
    <span>
      <span className="bold green">
        {user}@{host}
      </span>
      :<span className="blue">~</span>$
    </span>
  );
}