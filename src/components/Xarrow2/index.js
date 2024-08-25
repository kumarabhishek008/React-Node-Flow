import React, { useRef } from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Draggable from "react-draggable";
import { data } from "./data";

const boxStyle = {
  border: "grey solid 2px",
  borderRadius: "10px",
  padding: "5px",
};

const DraggableBox = ({ id, name }) => {
  const updateXarrow = useXarrow();
  return (
    <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
      <div id={id} style={boxStyle}>
        {name}
      </div>
    </Draggable>
  );
};

const XarrowComponent = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}
    >
      <Xwrapper>
        {data.map((item) => (
          <DraggableBox id={item.id} name={item.name} />
        ))}
        {data.map(
          (item, i) =>
            data[i + 1] && (
              <Xarrow start={item.id} end={data[i + 1].id} showHead={true} />
            )
        )}
      </Xwrapper>
    </div>
  );
};

export default XarrowComponent;
