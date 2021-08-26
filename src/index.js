import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Xaarow from './components/Xarrow'

function App() {
  const [state, setState] = useState("CLICK ME");

  return (
    <div style={{display:'flex', justifyContent:'space-between'}}>
        {/* <NewApp /> */}
        {/* <ReactReandererFlow/> */}
        <Xaarow/>
    </div>
  );
}

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
