import React, { useRef, useState } from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Draggable from "react-draggable";
import { data } from "./data";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

const boxStyle = {
  border: "grey solid 2px",
  borderRadius: "10px",
  padding: "8px 20px",
};

const XarrowComponent = () => {
  const [xarrowsLine, setxarrowsLine] = useState([]);
  const [sourceId, setsourceId] = useState(null);

  function handleAddconnect(sId, dId) {
    console.log(sId, dId);

    setxarrowsLine([...xarrowsLine, { sId, dId }]);
  }
  return (
    <div
      style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}
    >
      <Xwrapper>
        {data.map((item) => (
          <DraggableBox
            id={item.id}
            name={item.name}
            addconnect={handleAddconnect}
            setsourceId={setsourceId}
            sourceId={sourceId}
          />
        ))}
        {xarrowsLine.map((item, i) => (
          <Xarrow start={item.sId} end={item.dId} showHead={true} />
        ))}
      </Xwrapper>
    </div>
  );
};

const DraggableBox = ({ id, name, addconnect, setsourceId, sourceId }) => {
  const updateXarrow = useXarrow();

  function handleClickNode(e, id) {
    e.stopPropagation();
    e.preventDefault();
    console.log(e.target, id);
    setsourceId(id);
  }

  function handleLeaveNode(e, id) {
    console.log(e.target, "hiii", id);
    console.log(sourceId);
    addconnect(sourceId, id);
  }
  return (
    <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <AddIcon
          id={id + "_1"}
          fontSize="small"
          onMouseDown={(e) => handleClickNode(e, id + "_1")}
          onMouseUp={(e) => handleLeaveNode(e, id + "_1")}
        />
        <div id={id} style={boxStyle}>
          {name}
        </div>
        <AddIcon
          fontSize="small"
          id={id + "_2"}
          onMouseDown={(e) => handleClickNode(e, id + "_2")}
          onMouseUp={(e) => handleLeaveNode(e, id + "_2")}
        />
      </div>
    </Draggable>
  );
};

export default XarrowComponent;
