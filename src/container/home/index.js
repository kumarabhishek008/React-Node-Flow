import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <p>All features link</p>
      <a href={"/reactflowpoc"}>React Flow POC</a>
      <br />
      <a href={"/flow"}>Flow</a>
      <br />
      <a href={"/reactflowpoc2"}>React flow poc 2</a>
      <br />
      <a href={"/reactflowdnd"}>React flow dnd</a>
      <br />
      <a href={"/sidebar"}>Sidebar</a>
      <br />
      <a href={"/xarrow"}>Xarrow</a>
    </div>
  );
};

export default Home;
