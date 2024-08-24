import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactFlowPoc from "../../components/ReactFlowPoc";
import Flow from "../../components/flow";
import Home from "../home";
import ReactflowDnd from "../../components/ReactFlowDnd";
import ReactXarrow from "../../components/Xarrow2";
import ReactSidebar from "../../components/Sidebar";

const RouteContainer = (props) => {
  return (
    <>
      <BrowserRouter
        future={{
          v7_startTransition: true,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="reactflowpoc" element={<ReactFlowPoc />} />
          <Route path="flow" element={<Flow />} />
          <Route path="reactflowdnd" element={<ReactflowDnd />} />
          <Route path="sidebar" element={<ReactSidebar />} />
          <Route path="/xarrow" element={<ReactXarrow />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouteContainer;
