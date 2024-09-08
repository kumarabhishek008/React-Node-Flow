import React, { useRef, useState } from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Draggable from "react-draggable";
import { data } from "./data";
import { AddOutlined } from "@mui/icons-material";
import { Box, CylinderShape } from "./shape";

const boxStyle = {
  border: "grey solid 2px",
  borderRadius: "4px",
  padding: "5px",
  width: "5rem",
};

const XarrowComponent = () => {
  const [connections, setConnections] = useState([]);

  const [sourceId, setSourceId] = useState(null);
  const [movableEle, setmovableEle] = useState(null);
  const [movePos, setmovePos] = useState({
    top: 0,
    left: 0,
  });

  function addConnect(sId, tId) {
    setConnections([...connections, { sId, tId }]);
  }
  return (
    <div
      style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}
    >
      <Xwrapper>
        {data.map((item, i) => (
          <DraggableBox
            id={item.id}
            name={item.name}
            addConnect={addConnect}
            sourceId={sourceId}
            setSourceId={setSourceId}
            setmovableEle={setmovableEle}
            setmovePos={setmovePos}
            shapeType={i % 2 === 0 ? "cylinder" : "circle"}
          />
        ))}
        {connections.map((item, i) => (
          <Xarrow
            start={item?.sId}
            end={item?.tId}
            showHead={true}
            strokeWidth={1}
            path="smooth"
            // animateDrawing={true}
            dashness={{ strokeLen: 5, nonStrokeLen: 5, animation: true }}
          />
        ))}
        {sourceId && movableEle && (
          <Xarrow
            start={sourceId}
            end={movableEle}
            showHead={true}
            labels={"abcd"}
            color="green"
            strokeWidth={1}
            path="smooth"
            // animateDrawing={true}
            dashness={{ strokeLen: 5, nonStrokeLen: 5, animation: true }}
          />
        )}
        {sourceId && movableEle && (
          <div
            id="moveEle"
            style={{
              visibility: "hidden",
              width: "10px",
              height: "10px",
              background: "green",
              position: "absolute",
              top: movePos.top,
              left: movePos.left,
            }}
          ></div>
        )}
      </Xwrapper>
    </div>
  );
};

const shapes = {
  circle: (props) => <Box {...props} />,
  cylinder: (props) => <CylinderShape {...props} />,
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
}) => {
  const updateXarrow = useXarrow();

  function onMouseDrag(e, id) {
    e.preventDefault();
    e.stopPropagation();
    setSourceId(id);
    document.onmousemove = onMousemove;
    document.onmouseup = onMouseDragStop;
  }

  function onMousemove(e) {
    setmovePos({
      top: e.clientY,
      left: e.clientX,
    });
    setmovableEle("moveEle");
  }

  function onMouseDragStop(e) {
    setmovableEle(null);
    document.onmousemove = null;
  }

  function onMouseStop(e, id) {
    addConnect(sourceId, id);
  }

  return (
    <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
      <div
        style={{
          textAlign: "center",
          position: "absolute",
        }}
      >
        <AddOutlined
          fontSize="small"
          id={`${id}_1_t`}
          onMouseDown={(e) => onMouseDrag(e, `${id}_1_t`)}
          onMouseUp={(e) => onMouseStop(e, `${id}_1_t`)}
          style={{
            fontSize: "10px",
            position: "absolute",
            top: 0,
            left: "45%",
          }}
        />
        <AddOutlined
          fontSize="small"
          id={`${id}_1_l`}
          onMouseDown={(e) => onMouseDrag(e, `${id}_1_l`)}
          onMouseUp={(e) => onMouseStop(e, `${id}_1_l`)}
          style={{
            fontSize: "10px",
            position: "absolute",
            top: "35%",
            left: 0,
          }}
        />
        {shapeType ? (
          shapes[shapeType]({ id })
        ) : (
          <div id={id} style={boxStyle}>
            {name}
          </div>
        )}
        <AddOutlined
          fontSize="small"
          id={`${id}_2_b`}
          onMouseDown={(e) => onMouseDrag(e, `${id}_2_b`)}
          onMouseUp={(e) => onMouseStop(e, `${id}_2_b`)}
          style={{
            fontSize: "10px",
            position: "absolute",
            bottom: 0,
            left: "45%",
          }}
        />
        <AddOutlined
          fontSize="small"
          id={`${id}_2_r`}
          onMouseDown={(e) => onMouseDrag(e, `${id}_2_r`)}
          onMouseUp={(e) => onMouseStop(e, `${id}_2_r`)}
          style={{
            fontSize: "10px",
            position: "absolute",
            top: "35%",
            right: 0,
          }}
        />
      </div>
    </Draggable>
  );
};

export default XarrowComponent;
