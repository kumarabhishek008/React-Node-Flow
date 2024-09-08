import React, { useRef, useState } from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Draggable from "react-draggable";
import { data } from "./data";
import { AddOutlined } from "@mui/icons-material";
import { BoxShape, CylinderShape } from "./shapes";
import { get } from "jquery";

const boxStyle = {
  border: "grey solid 2px",
  borderRadius: "10px",
  padding: "5px",
  width: "5rem",
  height: "5rem",
  borderRadius: "40px",
  // background: `radial-gradient(50% 40px at 50% 40px, #0003 99.99%, #0000 0),
  //   radial-gradient(50% 40px at 50% calc(100% - 40px), #fff3 99.99%, #0000 0),
  //   red`,
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
            shape={i % 2 === 0 ? "box" : "cylinder"}
          />
        ))}
        {connections.map((item, i) => (
          <Xarrow start={item?.sId} end={item?.tId} showHead={true} />
        ))}
        {sourceId && movableEle && (
          <Xarrow start={sourceId} end={movableEle} showHead={true} />
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
  box: (props) => <BoxShape {...props} />,
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
  shape,
}) => {
  const updateXarrow = useXarrow();

  function onMouseDrag(e, id) {
    e.preventDefault();
    e.stopPropagation();
    setSourceId(id);
    console.log(e.target, id);
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
    console.log(sourceId, id);
    addConnect(sourceId, id);
  }

  const Component = get(shapes, shape);

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
          id={`${id}_1`}
          onMouseDown={(e) => onMouseDrag(e, `${id}_1`)}
          onMouseUp={(e) => onMouseStop(e, `${id}_1`)}
        />
        {shape ? (
          shapes[shape]({ id })
        ) : (
          <div id={id} style={boxStyle}>
            {name}
          </div>
        )}
        <AddOutlined
          fontSize="small"
          id={`${id}_2`}
          onMouseDown={(e) => onMouseDrag(e, `${id}_2`)}
          onMouseUp={(e) => onMouseStop(e, `${id}_2`)}
        />
      </div>
    </Draggable>
  );
};

export default XarrowComponent;
