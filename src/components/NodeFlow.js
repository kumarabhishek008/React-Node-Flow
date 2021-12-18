import React, { useState } from "react";
import "./style.scss";

const NodeFlow = () => {
  const [pos, setpos] = useState();
  const [dragPos, setDragPos] = useState({
    x: "",
    y: "",
  });

  const handleDragPosition = (e) => {
    console.log(e.pageX, e.pageY);
    setDragPos({
      x: e.pageX,
      y: e.pageY,
    });
  };

  const onDragEnd = (e) => {
    console.log(e.pageX, e.pageY);
    setDragPos({
      x: e.pageX,
      y: e.pageY,
    });
  };
  const a = { b: { c : { d: 'fhfbdhvjh'}}};
  console.log(a?.b?.c?.d)

  return (
    <>
      {/* <div
        onDrag={handleDragPosition}
        draggable
        onDragEnd={onDragEnd}
        className="drag-eleemnt"
        style={{ left: dragPos.x, top: dragPos.y }}
      >
        <ul>
          <h1>ferfgergrtgrtege</h1>
        </ul>
      </div> */}

      <svg width="500px" height="320px">
        <path
          d="M200,10 h100 v100 h100"
          fill="none"
          stroke="black"
        />
      </svg>
    </>
  );
};

export default NodeFlow;
