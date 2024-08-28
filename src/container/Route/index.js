import React from "react";
import ReactFlowPoc from "../../components/ReactFlowPoc";
import Flow from "../../components/flow";
import Home from "../home";
import ReactflowDnd from "../../components/ReactFlowDnd";
import ReactXarrow from "../../components/Xarrow2";
import ReactSidebar from "../../components/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SimpleTemplate from "../../components/Xarrow/NodeArrow";

const RouteContainer = (props) => {
  console.log(props);
  return (
    <>
      <Router>
        <Switch>
          <Route path="/reactflowpoc">
            <ReactFlowPoc />
          </Route>
          <Route path="/flow">
            <Flow />
          </Route>
          <Route path="/reactflowdnd">
            <ReactflowDnd />
          </Route>
          <Route path="/sidebar">
            <ReactSidebar />
          </Route>
          <Route path="/xarrow">
            <ReactXarrow />
          </Route>
          <Route path="/">
            <ReactXarrow />
            {/* <SimpleTemplate /> */}
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default RouteContainer;
