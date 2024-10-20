import React, { useEffect, useRef, useState } from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Draggable from "react-draggable";
import { data, edgeConn } from "./data";
import { AddOutlined, Close } from "@mui/icons-material";
import { Box, CylinderShape, EndNode, Simple } from "./shape";
import dagre from "dagre";
import { IconButton } from "@mui/material";
import { get, has, random, stubString } from "lodash";
import { Resizable } from "re-resizable";

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
  dragEle,
  setDragEle,
}) => {
  const updateXarrow = useXarrow();

  function handleDragFunc(e) {
    updateXarrow();
    console.log("hi");
    if (shapeType === "endnode") setDragEle("endnode");
  }

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
    console.log(dragEle);
    if (dragEle === "endnode") {
      setDragEle(null);
      return null;
    }

    e.preventDefault();

    if (shapeType === "endnode") addNewNode(id);
  }

  return (
    <Draggable onDrag={handleDragFunc} onStop={updateXarrow}>
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
                top: "-10px",
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
                left: "-10px",
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
                bottom: "-10px",
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
                right: "-10px",
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
