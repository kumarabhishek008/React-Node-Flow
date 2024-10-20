import { Resizable } from "re-resizable";
import React from "react";

const boxStyle = {
  border: "grey solid 2px",
  borderRadius: "4px",
  padding: "10px 20px",
  width: "5rem",
  height: "5rem",
  borderRadius: "50px",
};

const Box = ({ id, name, onClick }) => {
  return (
    <Resizable boxStyle={boxStyle} id={id}>
      <div
        // style={boxStyle}
        onClick={onClick}
      />
    </Resizable>
  );
};

const cylinderStyle = {
  //   border: "grey solid 2px",
  borderRadius: "4px",
  padding: "5px",
  width: "5rem",
  height: "10rem",
  background: `radial-gradient(50% 40px at 50% 40px, #0003 99.99%, #0000 0),
    radial-gradient(50% 40px at 50% calc(100% - 40px), #fff3 99.99%, #0000 0),
    red`,
};

const CylinderShape = ({ id, name, onClick }) => {
  return <div id={id} style={cylinderStyle} onClick={onClick} />;
};

const endNodeStyle = {
  border: "grey solid 2px",
  borderRadius: "4px",
  padding: "5px",
  width: "5rem",
  height: "20px",
  cursor: "grab",
};

const EndNode = ({ id, name, onClick }) => {
  return (
    <div
      id={id}
      style={{
        ...endNodeStyle,
        borderRadius: "40px",
        border: "0px solid #b2b2b2",
        boxShadow: "0px 3px 5px #cacaca",
        padding: "5px 5px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {name && (
        <p style={{ fontSize: "12px", margin: "0px", textAlign: "center" }}>
          {name}
        </p>
      )}
    </div>
  );
};

const Simple = ({ id, name, onClick }) => {
  return (
    <Resizable style={boxStyle} id={id}>
      <div
        // style={endNodeStyle}
        onClick={onClick}
      >
        {name && (
          <p style={{ fontSize: "12px", margin: "0px", textAlign: "center" }}>
            {name}
          </p>
        )}
      </div>
    </Resizable>
  );
};

export { Box, CylinderShape, EndNode, Simple };
