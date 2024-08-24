import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <p>All features link</p>
      <Link to={"/reactflowpoc"}>React Flow POC</Link>
      <br />
      <Link to={"/flow"}>Flow</Link>
      <br />
      <Link to={"/reactflowpoc2"}>React flow poc 2</Link>
      <br />
      <Link to={"/reactflowdnd"}>React flow dnd</Link>
      <br />
      <Link to={"/sidebar"}>Sidebar</Link>
      <br />
      <Link to={"/xarrow"}>Xarrow</Link>
    </div>
  );
};

export default Home;
