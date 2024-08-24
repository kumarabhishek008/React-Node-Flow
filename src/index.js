import React, { useState } from "react";
import { render } from "react-dom";
import AppContainer from "./App";

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <AppContainer />
    </div>
  );
}

render(<App />, document.getElementById("root"));
