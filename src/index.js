import React, { useState } from "react";
import { render } from "react-dom";
import ReactFlowPoc2 from "./components/ReactFlowPoc2";

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <ReactFlowPoc2 />
    </div>
  );
}

render(<App />, document.getElementById("root"));
