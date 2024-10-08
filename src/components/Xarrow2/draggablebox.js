import React, { useEffect, useRef, useState } from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Draggable from "react-draggable";
import { data, edgeConn } from "./data";
import { AddOutlined, Close } from "@mui/icons-material";
import { Box, CylinderShape, EndNode, Simple } from "./shape";
import dagre from "dagre";
import { IconButton } from "@mui/material";
import { get, has, random, stubString } from "lodash";

const shapes = {
  circle: (props) => <Box {...props} />,
  cylinder: (props) => <CylinderShape {...props} />,
  endnode: (props) => <EndNode {...props} />,
  simple: (props) => <Simple {...props} />,
};

const boxStyle = {
  border: "grey solid 2px",
  borderRadius: "4px",
  padding: "5px",
  width: "5rem",
  cursor: "grab",
};

const DraggableBox = ({
  id,
  name,
  addConnect,
  sourceId,
  setSourceId,
  setmovableEle,
  setmovePos,
  shapeType,
  position,
  addNewNode,
}) => {
  const updateXarrow = useXarrow();

  function onMouseDrag(e, id) {
    e.preventDefault();
    e.stopPropagation();
    if (shapeType !== "endnode") {
      setSourceId(id);
      document.onmousemove = onMousemove;
      document.onmouseup = onMouseDragStop;
    }
  }

  function onMousemove(e) {
    if (shapeType !== "endnode") {
      setmovePos({
        top: e.clientY,
        left: e.clientX,
      });
      setmovableEle("moveEle");
    }
  }

  function onMouseDragStop(e) {
    setmovableEle(null);
    document.onmousemove = null;
  }

  function onMouseStop(e, id) {
    addConnect(sourceId, id);
  }

  function handleClickNode(e) {
    console.log("clicked me");
    console.log(e);
    e.preventDefault();

    if (shapeType === "endnode") addNewNode(id);
  }

  return (
    <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
      <div
        style={{
          // textAlign: "center",
          position: "absolute",
          top: position?.y,
          left: position?.x,
        }}
      >
        {shapeType !== "endnode" && (
          <>
            <AddOutlined
              fontSize="small"
              // id={id}
              onMouseDown={(e) => onMouseDrag(e, id)}
              onMouseUp={(e) => onMouseStop(e, id)}
              style={{
                fontSize: "10px",
                position: "absolute",
                top: 0,
                left: "45%",
              }}
            />
            <AddOutlined
              fontSize="small"
              // id={id}
              onMouseDown={(e) => onMouseDrag(e, id)}
              onMouseUp={(e) => onMouseStop(e, id)}
              style={{
                fontSize: "10px",
                position: "absolute",
                top: "35%",
                left: 0,
              }}
            />
            <AddOutlined
              fontSize="small"
              // id={id}
              onMouseDown={(e) => onMouseDrag(e, id)}
              onMouseUp={(e) => onMouseStop(e, id)}
              style={{
                fontSize: "10px",
                position: "absolute",
                bottom: 0,
                left: "45%",
              }}
            />
            <AddOutlined
              fontSize="small"
              // id={id}
              onMouseDown={(e) => onMouseDrag(e, id)}
              onMouseUp={(e) => onMouseStop(e, id)}
              style={{
                fontSize: "10px",
                position: "absolute",
                top: "35%",
                right: 0,
              }}
            />
          </>
        )}
        {shapeType && has(shapes, shapeType) ? (
          shapes[shapeType]({ id, name, onClick: handleClickNode })
        ) : (
          <div id={id} style={boxStyle}>
            {name}
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default React.memo(DraggableBox);
