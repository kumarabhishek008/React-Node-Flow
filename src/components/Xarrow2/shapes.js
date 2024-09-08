import React from "react";

const boxStyle = {
  border: "grey solid 1px",
  borderRadius: "4px",
  padding: "5px",
  width: "5rem",
  height: "5rem",
  borderRadius: "40px",
};

const BoxShape = ({ id }) => {
  return <div id={id} style={boxStyle}></div>;
};
const cylinderStyle = {
  border: "grey solid 1px",
  borderRadius: "4px",
  padding: "5px",
  width: "5rem",
  height: "10rem",
  borderRadius: "40px",
  background: `radial-gradient(50% 40px at 50% 40px, #0003 99.99%, #0000 0),
    radial-gradient(50% 40px at 50% calc(100% - 40px), #fff3 99.99%, #0000 0),
    red`,
};

const CylinderShape = ({ id }) => {
  return <div id={id} style={cylinderStyle}></div>;
};

export { BoxShape, CylinderShape };
