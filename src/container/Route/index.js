import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactFlowPoc from "../../components/ReactFlowPoc";
import Flow from "../../components/flow";
import Home from "../home";
import ReactflowDnd from "../../components/ReactFlowDnd";
import ReactXarrow from "../../components/Xarrow";
import ReactSidebar from "../../components/Sidebar";

const RouteContainer = (props) => {
  return (
    <>
      <BrowserRouter
        future={{
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reactflowpoc" element={<ReactFlowPoc />} />
          <Route path="/flow" element={<Flow />} />
          <Route path="/reactflowdnd" element={<ReactflowDnd />} />
          <Route path="/xarrow" element={<ReactXarrow />} />
          <Route path="/sidebar" element={<ReactSidebar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouteContainer;
