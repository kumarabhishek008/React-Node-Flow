import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Xaarow from './components/Xarrow/Xarrow';
import Reactflow from "./components/Reactflow/Reactflow";
import Xarrow, { useXarrow, xarrowPropsType, Xwrapper } from "react-xarrows";
import NewApp from "./App";
import Component1 from "./components/Sidebar";
import Button from './Component1/Button/Button';
import { ApiContextProvider } from "./utils/ApiContext";
import ChatView from "./components/chatview";
import Editor from "./components/Editor";
import ReactFlowPoc from "./components/ReactFlowPoc";

function App() {
  const updateXarrow = useXarrow();
  const [state, setState] = useState("CLICK ME");

  return (
    <div style={{display:'flex', justifyContent:'space-between'}}>
      {/* <ApiContextProvider> */}
          {/* <NewApp /> */}
          {/* <ReactReandererFlow/> */}
          {/* <Xaarow updateXarrow={updateXarrow}/> */}
          {/* <ReactFlowPoc/> */}
          <Reactflow/>
          {/* <Editor/> */}
          {/* <Component1/> */}
          {/* <Button label="Click me please"/> */}
          {/* <ChatView/> */}
      {/* </ApiContextProvider> */}
    </div>
  );
}

render(<App />,document.getElementById("root"));

