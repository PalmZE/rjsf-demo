import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Simple } from "./rjsf/Simple";

function App() {
  const [opt, setOpt] = useState(1);

  return (
    <>
      <div
        style={{
          display: "flex"
        }}
      >
        <button
          onClick={() => setOpt(1)}
          style={{ color: opt === 1 ? "red" : undefined }}
        >
          RJSF
        </button>
      </div>

      <div>{opt === 1 && <Simple />}</div>
    </>
  );
}

export default App;
